"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ThemeToggle } from "./theme-toggle"
import LoginModal from "@/components/login-modal"

const LanguageMenu = dynamic(() => import("./language-menu"), { ssr: false })

type HeaderProps = { language?: "English" | "Korean" }
export default function Header({ language }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"signin" | "signup">("signup")
  const [appLanguage, setAppLanguage] = useState<"English" | "Korean">("English")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("appLanguage")
      if (!stored) {
        // Persist English as the default language on first view
        localStorage.setItem("appLanguage", "English")
        setAppLanguage("English")
      } else {
        setAppLanguage(stored === "Korean" ? "Korean" : "English")
      }
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === "appLanguage") {
        setAppLanguage(e.newValue === "Korean" ? "Korean" : "English")
      }
    }
    const onLanguageChange = (e: Event) => {
      try {
        const detail = (e as CustomEvent<"English" | "Korean">).detail
        setAppLanguage(detail === "Korean" ? "Korean" : "English")
      } catch {}
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener("appLanguageChange", onLanguageChange as EventListener)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const effectiveLanguage = language ?? appLanguage

  // Reflect current page language in <html lang> for SEO/UX parity
  useEffect(() => {
    try {
      document.documentElement.lang = effectiveLanguage === "Korean" ? "ko" : "en"
    } catch {}
  }, [effectiveLanguage])

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center notranslate" translate="no">
          <span
            className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent"
            translate="no"
          >
            BOOSTK
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            {effectiveLanguage === "Korean" ? "서비스" : "Services"}
          </a>
          <a href="#solution" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            {effectiveLanguage === "Korean" ? "솔루션" : "Solution"}
          </a>
          <a href="#pricing" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            {effectiveLanguage === "Korean" ? "요금제" : "Pricing"}
          </a>
          <button
            type="button"
            className="text-sm font-sans text-muted-foreground transition hover:text-foreground"
            onClick={() => {
              setModalMode("signup")
              setLoginOpen(true)
            }}
          >
            {effectiveLanguage === "Korean" ? "문의하기" : "Contact"}
          </button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <LanguageMenu className="gap-2 font-sans bg-transparent" align="end" />

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 font-sans"
            onClick={() => {
              setModalMode("signup")
              setLoginOpen(true)
            }}
          >
            {effectiveLanguage === "Korean" ? "상담 요청" : "Request Consultation"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border/40 bg-card md:hidden">
          <div className="flex flex-col gap-4 px-4 py-4">
            <a
              href="#services"
              className="text-sm font-sans text-muted-foreground transition hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {effectiveLanguage === "Korean" ? "서비스" : "Services"}
            </a>
            <a
              href="#solution"
              className="text-sm font-sans text-muted-foreground transition hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {effectiveLanguage === "Korean" ? "솔루션" : "Solution"}
            </a>
            <a
              href="#pricing"
              className="text-sm font-sans text-muted-foreground transition hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {effectiveLanguage === "Korean" ? "요금제" : "Pricing"}
            </a>
            <button
              type="button"
              className="text-sm font-sans text-muted-foreground transition hover:text-foreground text-left"
              onClick={() => {
                setIsOpen(false)
                setModalMode("signup")
                setLoginOpen(true)
              }}
            >
              {effectiveLanguage === "Korean" ? "문의하기" : "Contact"}
            </button>
            <LanguageMenu className="w-full gap-2 justify-start font-sans bg-transparent" align="start" />
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 font-sans"
              onClick={() => {
                setIsOpen(false)
                setModalMode("signup")
                setLoginOpen(true)
              }}
            >
              {effectiveLanguage === "Korean" ? "상담 요청" : "Request Consultation"}
            </Button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} initialMode={modalMode} />
    </header>
  )
}
