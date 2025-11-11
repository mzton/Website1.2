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

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "signin" | "signup"
}

export default function LoginModal({ open, onOpenChange, initialMode = "signin" }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  // Read the current language from the global store via a selector.
  // Using a selector like `(s) => s.language` ensures this component only re-renders
  // when `language` changes, avoiding unnecessary updates.
  const language = useAppStore((s) => s.language)
  const [mode, setMode] = useState<"signin" | "signup">(initialMode)
  const [role, setRole] = useState<"client" | "teacher">("client")
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
  //   and then `setLanguage("Korean")` or `setLanguage("English")`.

  // For convenience, use the store value directly for translations.
  const effectiveLanguage = language

  const koLogin = {
    signIn: "로그인",
    signUp: "회원가입",
    accessAccount: "계정에 접근",
    email: "이메일",
    password: "비밀번호",
    joinAs: "역할 선택",
    client: "고객",
    assistant: "어시스턴트",
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
    toastWelcome: (isAssistant: boolean, docCount: number) => `환영합니다, ${isAssistant ? "어시스턴트" : "고객"}. ${isAssistant && docCount > 0 ? `${docCount}개 파일 선택됨. ` : ""}곧 연락드리겠습니다.`,
  }

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setDocuments(files)
  }

  // Keep mode in sync with the trigger intent when modal opens
  useEffect(() => {
    if (open) {
      setMode(initialMode)
    }
  }, [initialMode, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    }
    if (mode === "signin") {
      toast({
        title: effectiveLanguage === "Korean" ? koLogin.toastSignedIn.title : "Signed in",
        description: effectiveLanguage === "Korean" ? koLogin.toastSignedIn.desc : "Welcome back. We’ll be in touch soon.",
      })
    } else {
      toast({
        title: effectiveLanguage === "Korean" ? koLogin.toastSignedUpTitle : "Thanks for signing up!",
        description:
          effectiveLanguage === "Korean"
            ? koLogin.toastWelcome(role === "teacher", documents.length)
            : `Welcome, ${role === "teacher" ? "Assistant" : "Client"}. ${role === "teacher" && documents.length > 0 ? `${documents.length} document${documents.length > 1 ? "s" : ""} selected. ` : ""}We’ll be in touch soon.`,
      })
    }
    onOpenChange(false)
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.emailPlaceholder : "you@example.com"}
                  required
                  autoComplete="email"
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
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label>
                  {effectiveLanguage === "Korean" ? (
                    <span className="notranslate" translate="no">{koLogin.joinAs}</span>
                  ) : (
                    "Join as"
                  )}
                </Label>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as any)} className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koLogin.client}</span>
                      ) : (
                        "Client"
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koLogin.assistant}</span>
                      ) : (
                        "Assistant"
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={effectiveLanguage === "Korean" ? koLogin.emailPlaceholder : "you@example.com"}
                  required
                  autoComplete="email"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity(effectiveLanguage === "Korean" ? koLogin.requiredEmail : "")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              {role === "teacher" && (
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