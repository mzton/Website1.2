"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { MessageSquare, X, Send, User, Minimize2, Maximize2 } from "lucide-react"

// Custom minimize icon: rounded square outline with a short rounded bar
function MinimizeRoundedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Rounded pill line to match the reference */}
      <path d="M4 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

type Message = { from: "sarah" | "user"; text: string; timestamp: number }

const services = [
  "Content & Presence",
  "Sales & Commerce",
  "Enterprise Growth",
]

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"credentials" | "chat">("credentials")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [service, setService] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Open -> focus appropriately
  useEffect(() => {
    if (!open) return
    const el = step === "credentials" ? undefined : inputRef.current
    el?.focus()
  }, [open, step])

  const validEmail = (e: string) => /.+@.+\..+/.test(e)
  const canSubmit = name.trim() && validEmail(email) && service

  const startChat = () => {
    if (!canSubmit) return
    setStep("chat")
    // Seed conversation
    const greeting = `Hi ${name}! Thanks for reaching out to sales. How can I help you today?`
    setMessages([{ from: "sarah", text: greeting, timestamp: Date.now() }])
  }

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { from: "user", text, timestamp: Date.now() }])
    setInput("")
    setTyping(true)
    // Simulate agent reply after 2 seconds
    setTimeout(() => {
      const reply = `Thanks for the details! I’ll guide you on ${service}.`
      setMessages((prev) => [...prev, { from: "sarah", text: reply, timestamp: Date.now() }])
      setTyping(false)
    }, 2000)
  }

  // Allow other sections to programmatically open the chat
  useEffect(() => {
    const handler = () => setOpen(true)
    // Custom event approach
    window.addEventListener("livechat:open", handler as EventListener)
    // Optional direct function
    ;(window as any).LiveChatOpen = () => setOpen(true)
    return () => {
      window.removeEventListener("livechat:open", handler as EventListener)
      delete (window as any).LiveChatOpen
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      {!open && (
        <button
          type="button"
          aria-label="Open live chat"
          className="size-16 rounded-full shadow-lg bg-gradient-to-br from-fuchsia-600 to-pink-500 flex items-center justify-center text-white hover:opacity-90 animate-chat-bounce hover:animate-none"
          onClick={() => setOpen(true)}
        >
          <MessageSquare className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <Card className={`${fullscreen ? "w-[min(90vw,800px)] sm:w-[720px]" : "w-[340px] sm:w-[380px]"} shadow-2xl border bg-background overflow-hidden p-0`}>
          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile avatar (uses image from /public with fallback) */}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 bg-white/20 flex items-center justify-center">
                {avatarError ? (
                  <User className="w-4 h-4 text-white" aria-hidden="true" />
                ) : (
                  <img
                    src="/avatar-sarah.png"
                    alt="Agent avatar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => setAvatarError(true)}
                  />
                )}
              </div>
              <div>
                <div className="text-sm font-semibold">Clyde Antonio</div>
                <div className="text-[11px] opacity-90">Online • Avg. response: 2 min</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1 rounded-full hover:bg-white/20"
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                title="Minimize"
              >
                <MinimizeRoundedIcon className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                className="p-1 rounded-full hover:bg-white/20"
                onClick={() => setFullscreen((v) => !v)}
                aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {fullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Credentials Step */}
          {step === "credentials" && (
            <div className="p-4 space-y-3">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Select value={service} onValueChange={setService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full" disabled={!canSubmit} onClick={startChat}>Start Chat</Button>
            </div>
          )}

          {/* Chat Step */}
          {step === "chat" && (
            <div className={`flex flex-col ${fullscreen ? "h-[90vh]" : "h-[420px]"}`}>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                {messages.map((m, i) => (
                  <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-card border"}`}>
                    {m.text}
                  </div>
                ))}
                {typing && (
                  <div className="text-xs text-muted-foreground">Clyde is typing…</div>
                )}
              </div>
              <div className="p-3 flex items-center gap-2 border-t">
                <Input
                  ref={inputRef}
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
                />
                <Button variant="default" size="icon" onClick={sendMessage} aria-label="Send">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Removed lower close button as minimize already exists */}
    </div>
  )
}