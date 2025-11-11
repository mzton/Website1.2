"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ThemeToggle } from "./theme-toggle"
import LoginModal from "@/components/login-modal"
import Image from "next/image"
import { useAppStore } from "@/hooks/use-app-store"
 

const LanguageMenu = dynamic(() => import("./language-menu"), { ssr: false })

type HeaderProps = { language?: "English" | "Korean" }
export default function Header({ language }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"signin" | "signup">("signup")
  // Read language from the global Zustand store.
  // Using a selector (s => s.language) means this component only re-renders
  // when the language value actually changes, avoiding unnecessary updates.
  const appLanguage = useAppStore((s) => s.language)

  const effectiveLanguage = language ?? appLanguage

  // Note: We no longer mutate <html lang> here. The global store
  // updates <html lang> when setLanguage is called, centralizing side effects.

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm md:backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" aria-label="Home" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="BOOSTK logo"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            {effectiveLanguage === "Korean" ? "서비스" : "Services"}
          </a>
          <a href="#solution" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            {effectiveLanguage === "Korean" ? "우리는" : "Solution"}
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
