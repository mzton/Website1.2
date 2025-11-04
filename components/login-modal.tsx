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

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "signin" | "signup"
}

export default function LoginModal({ open, onOpenChange, initialMode = "signin" }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [mode, setMode] = useState<"signin" | "signup">(initialMode)
  const [role, setRole] = useState<"client" | "teacher">("client")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [documents, setDocuments] = useState<File[]>([])

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
        toast({ title: "Password too short", description: "Use at least 6 characters." })
        return
      }
      if (password !== confirmPassword) {
        toast({ title: "Passwords do not match", description: "Please re-enter to match both." })
        return
      }
    }
    if (mode === "signin") {
      toast({
        title: "Signed in",
        description: "Welcome back. We’ll be in touch soon.",
      })
    } else {
      toast({
        title: "Thanks for signing up!",
        description: `Welcome, ${role === "teacher" ? "Assistant" : "Client"}. ${role === "teacher" && documents.length > 0 ? `${documents.length} document${documents.length > 1 ? "s" : ""} selected. ` : ""}We’ll be in touch soon.`,
      })
    }
    onOpenChange(false)
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[92vw] sm:max-w-md p-6 sm:p-8 rounded-xl max-h-[85vh] sm:max-h-none overflow-y-auto">
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label>Join as</Label>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as any)} className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client">Client</Label>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">Assistant</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required autoComplete="name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
              </div>
              {role === "teacher" && (
                <div className="space-y-2">
                  <Label htmlFor="documents">Optional: Upload required documents (images)</Label>
                  <Input id="documents" type="file" accept="image/*" multiple onChange={handleDocsChange} />
                  {documents.length > 0 && (
                    <p className="text-xs text-muted-foreground">{documents.length} file(s) selected</p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" required autoComplete="new-password" />
              </div>

              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}