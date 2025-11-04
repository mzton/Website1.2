"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { ThemeToggle } from "./theme-toggle"
import LoginModal from "@/components/login-modal"

const LanguageMenu = dynamic(() => import("./language-menu"), { ssr: false })

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 notranslate" translate="no">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent" translate="no">
            <span className="text-sm font-bold text-primary-foreground" translate="no">BK</span>
          </div>
          <span className="text-xl font-bold text-foreground" translate="no">BOOSTK</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            Services
          </a>
          <a href="#proof" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            Proof
          </a>
          <a href="#solution" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            Solution
          </a>
          <a href="#pricing" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            Pricing
          </a>
          <a href="#contact" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
            Contact
          </a>
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <LanguageMenu className="gap-2 font-sans bg-transparent" align="end" />

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 font-sans"
            onClick={() => setLoginOpen(true)}
          >
            Request Consultation
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
            <a href="#services" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
              Services
            </a>
            <a href="#proof" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
              Proof
            </a>
            <a href="#solution" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
              Solution
            </a>
            <a href="#pricing" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-sans text-muted-foreground transition hover:text-foreground">
              Contact
            </a>
            <LanguageMenu className="w-full gap-2 justify-start font-sans bg-transparent" align="start" />
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 font-sans"
              onClick={() => {
                setIsOpen(false)
                setLoginOpen(true)
              }}
            >
              Request Consultation
            </Button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  )
}
