"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
// Read global UI state (language) from the Zustand store.
// This removes localStorage/event listeners here and centralizes persistence + DOM side-effects.
import { useAppStore } from "@/hooks/use-app-store"
// Align auth interactions with the shared types and schema.
import type { AuthFormData, RegisterFormData } from "@/types/auth"
// NOTE: Client components should not import server-only code (e.g., Prisma).
// We submit to API routes under app/api/auth/* to avoid bundling server code.

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "signin" | "signup"
}

/**
 * LoginModal
 *
 * Patterns this component to the shared auth types (types/auth.ts)
 * and Prisma schema (schema.prisma). Specifically:
 * - Uses UserRole options: 'Admin' | 'Assistant' | 'Viewer'
 * - For signin: collects { email, password }
 * - For signup: collects { name, email, password, role, confirmPassword }
 * - Submits via API routes under app/api/auth/* to avoid bundling server-only code
 */
export default function LoginModal({ open, onOpenChange, initialMode = "signin" }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  // Read the current language from the global store via a selector.
  // Using a selector like `(s) => s.language` ensures this component only re-renders
  // when `language` changes, avoiding unnecessary updates.
  const language = useAppStore((s) => s.language)
  const [mode, setMode] = useState<"signin" | "signup">(initialMode)
  // Role options match Prisma's UserRole enum and types/auth.ts
  // Use RegisterFormData['role'] to keep the union type in sync.
  const [role, setRole] = useState<RegisterFormData["role"]>("Viewer")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [documents, setDocuments] = useState<File[]>([])
  // Note:
  // - We removed local language state and localStorage/event syncing.
  // - `hooks/use-app-store.ts` now handles persistence, <html lang> updates,
  //   and compatibility events across the app. If you need to update language here,
  //   you could call: `const setLanguage = useAppStore((s) => s.setLanguage)`
  //   and then `setLanguage("Korean")` or `setLanguage("English")`.x

  // For convenience, use the store value directly for translations.
  const effectiveLanguage = language

  // Basic i18n strings; keys map to consistent role names.
  const koLogin = {
    signIn: "로그인",
    signUp: "회원가입",
    accessAccount: "계정에 접근",
    email: "이메일",
    password: "비밀번호",
    joinAs: "역할 선택",
    admin: "관리자",
    assistant: "어시스턴트",
    viewer: "뷰어",
    name: "이름",
    namePlaceholder: "이름 입력",
    emailPlaceholder: "you@example.com",
    passwordMin: "최소 6자",
    confirmPassword: "비밀번호 확인",
    confirmPasswordPlaceholder: "비밀번호 재입력",
    // Required-field messages (used by HTML5 validation)
    requiredGeneric: "필수 항목입니다.",
    requiredEmail: "이메일을 입력해주세요.",
    requiredPassword: "비밀번호를 입력해주세요.",
    requiredName: "이름을 입력해주세요.",
    requiredConfirmPassword: "비밀번호를 다시 입력해주세요.",
    uploadDocs: "선택 사항: 필요한 문서 업로드(이미지)",
    filesSelected: (n: number) => `${n}개 파일 선택됨`,
    createAccount: "계정 만들기",
    toastShort: { title: "비밀번호가 너무 짧습니다", desc: "최소 6자 이상 사용하세요." },
    toastMismatch: { title: "비밀번호가 일치하지 않습니다", desc: "다시 입력해주세요." },
    toastSignedIn: { title: "로그인 완료", desc: "다시 오신 것을 환영합니다. 곧 연락드리겠습니다." },
    toastSignedUpTitle: "가입해 주셔서 감사합니다!",
    toastWelcome: (roleLabel: string, docCount: number) => `환영합니다, ${roleLabel}. ${docCount > 0 ? `${docCount}개 파일 선택됨. ` : ""}곧 연락드리겠습니다.`,
  }

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setDocuments(files)
  }

  // Reset all form-controlled fields. This helps avoid stale values when the modal is closed or after a successful submission.
  const resetFields = () => {
    setRole("Viewer")
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setDocuments([])
  }

  // Keep mode in sync with the trigger intent when modal opens
  useEffect(() => {
    if (open) {
      setMode(initialMode)
    }
  }, [initialMode, open])

  /**
   * Submit handler aligns payloads to types/auth.ts.
   * - signin -> AuthFormData
   * - signup -> RegisterFormData
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // pang koreano
    if (mode === "signup") {
      if (password.length < 6) {
        toast({
          title: effectiveLanguage === "Korean" ? koLogin.toastShort.title : "Password too short",
          description: effectiveLanguage === "Korean" ? koLogin.toastShort.desc : "Use at least 6 characters.",
        })
        return
      }
      if (password !== confirmPassword) {
        toast({
          title: effectiveLanguage === "Korean" ? koLogin.toastMismatch.title : "Passwords do not match",
          description: effectiveLanguage === "Korean" ? koLogin.toastMismatch.desc : "Please re-enter to match both.",
        })
        return
      }
      // Build a typed registration payload (matches RegisterFormData)
      const payload: RegisterFormData = { name, email, password, role }
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await resp.json()
      if (!resp.ok || "error" in result) {
        toast({ title: effectiveLanguage === "Korean" ? "오류" : "Error", description: result.error || (effectiveLanguage === "Korean" ? "요청 실패" : "Request failed") })
        return
      }
      const roleLabel = effectiveLanguage === "Korean"
        ? (role === "Admin" ? koLogin.admin : role === "Assistant" ? koLogin.assistant : koLogin.viewer)
        : role
      toast({
        title: effectiveLanguage === "Korean" ? koLogin.toastSignedUpTitle : "Thanks for signing up!",
        description:
          effectiveLanguage === "Korean"
            ? koLogin.toastWelcome(roleLabel, documents.length)
            : `Welcome, ${role}. ${documents.length > 0 ? `${documents.length} document${documents.length > 1 ? "s" : ""} selected. ` : ""}We’ll be in touch soon.`,
      })
      // Clear fields before closing the modal to prevent persistence on next open.
      resetFields()
      onOpenChange(false)
      router.push("/")
      return
    }
    // Sign in flow: build typed AuthFormData payload
    const loginPayload: AuthFormData = { email, password }

    // logging in 
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPayload),
    })

    //error hindi tama login or not authenticated
    const loginResult = await resp.json()
    if (!resp.ok || "error" in loginResult) {
      toast({ title: effectiveLanguage === "Korean" ? "오류" : "Error", description: loginResult.error || (effectiveLanguage === "Korean" ? "요청 실패" : "Request failed") })
      return
    }
    // if yes go here
    toast({
      title: effectiveLanguage === "Korean" ? koLogin.toastSignedIn.title : "Signed in",
      description: effectiveLanguage === "Korean" ? koLogin.toastSignedIn.desc : "Welcome back. We’ll be in touch soon.",
    })
    // Clear fields before closing to avoid seeing old credentials later.
    resetFields()
    onOpenChange(false)
    router.push("/")
  }

  return (
    <Dialog
      open={open}
      // Intercept close to clear fields. We still delegate to the provided handler.
      onOpenChange={(next) => {
        if (!next) {
          resetFields()
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="w-full max-w-[92vw] sm:max-w-md p-6 sm:p-8 rounded-xl max-h-[85vh] sm:max-h-none overflow-y-auto">
        {/* Accessible title for screen readers (visually hidden) */}
        <DialogHeader className="sr-only">
          <DialogTitle>
            {effectiveLanguage === "Korean" ? (
              <span className="notranslate" translate="no">{mode === "signin" ? koLogin.signIn : koLogin.signUp}</span>
            ) : (
              mode === "signin" ? "Sign In" : "Sign Up"
            )}
          </DialogTitle>
          <DialogDescription>
            {effectiveLanguage === "Korean" ? (
              <span className="notranslate" translate="no">{koLogin.accessAccount}</span>
            ) : (
              "Access your account"
            )}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">
              {effectiveLanguage === "Korean" ? (
                <span className="notranslate" translate="no">{koLogin.signIn}</span>
              ) : (
                "Sign In"
              )}
            </TabsTrigger>
            <TabsTrigger value="signup">
              {effectiveLanguage === "Korean" ? (
                <span className="notranslate" translate="no">{koLogin.signUp}</span>
              ) : (
                "Sign Up"
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            {/* Turn off form-level autocomplete to discourage browser prefill for credentials. */}
            <form onSubmit={handleSubmit} className="space-y-5 pt-4" autoComplete="off">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.email}</span>
                  ) : (
                    "Email"
                  )}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.emailPlaceholder : "you@example.com"}
                  required
                  autoComplete="off"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredEmail : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.password}</span>
                  ) : (
                    "Password"
                  )}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredPassword : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <Button type="submit" className="w-full">
                {effectiveLanguage === "Korean" ? (
                  <span className="notranslate" translate="no">{koLogin.signIn}</span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            {/* Turn off form-level autocomplete for sign up to avoid unintended prefill. no autocomplete for safety*/}
            <form onSubmit={handleSubmit} className="space-y-5 pt-4" autoComplete="off">
              <div className="space-y-2">
                <Label>
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.joinAs}</span>
                  ) : (
                    "Join as"
                  )}
                </Label>


                {/* Role selector uses Prisma's UserRole enum values dito coconnect yung db basta kulang toh dont touch*/}
                <RadioGroup value={role} onValueChange={(v) => setRole(v as any)} className="grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="Admin" id="Admin" />
                    <Label htmlFor="Admin">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koLogin.admin}</span>
                      ) : (
                        "Admin"
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="Assistant" id="Assistant" />
                    <Label htmlFor="Assistant">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koLogin.assistant}</span>
                      ) : (
                        "Assistant"
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="Viewer" id="Viewer" />
                    <Label htmlFor="Viewer">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koLogin.viewer}</span>
                      ) : (
                        "Viewer"
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.name}</span>
                  ) : (
                    "Name"
                  )}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.namePlaceholder : "Your name"}
                  required
                  autoComplete="name"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredName : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-signup">
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.email}</span>
                  ) : (
                    "Email"
                  )}
                </Label>
                <Input
                  id="email-signup"
                  name="email-signup"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.emailPlaceholder : "you@example.com"}
                  required
                  autoComplete="off"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredEmail : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              {role === "Assistant" && (
                <div className="space-y-2">
                  <Label htmlFor="documents">
                    {effectiveLanguage === "Korean" ? (
                      <span className="notranslate" translate="no">{koLogin.uploadDocs}</span>
                    ) : (
                      "Optional: Upload required documents (images)"
                    )}
                  </Label>
                <Input id="documents" type="file" accept="image/*" multiple onChange={handleDocsChange} />
                  {documents.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koLogin.filesSelected(documents.length)}</span>
                      ) : (
                        `${documents.length} file(s) selected`
                      )}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password-signup">
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.password}</span>
                  ) : (
                    "Password"
                  )}
                </Label>
                <Input
                  id="password-signup"
                  name="password-signup"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.passwordMin : "At least 6 characters"}
                  required
                  autoComplete="new-password"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredPassword : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.confirmPassword}</span>
                  ) : (
                    "Confirm Password"
                  )}
                </Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.confirmPasswordPlaceholder : "Re-enter password"}
                  required
                  autoComplete="new-password"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredConfirmPassword : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>

              <Button type="submit" className="w-full">
                {effectiveLanguage === "Korean" ? (
                  <span className="notranslate" translate="no">{koLogin.createAccount}</span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}