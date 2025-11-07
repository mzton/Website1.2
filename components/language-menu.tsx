"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation"

type LanguageMenuProps = {
  className?: string
  align?: "start" | "end"
}

export default function LanguageMenu({ className, align = "end" }: LanguageMenuProps) {
  const [language, setLanguage] = useState("English")
  const router = useRouter()
  const pathname = usePathname()

  // Initialize from stored preference to keep the button label in sync
  useEffect(() => {
    try {
      const stored = localStorage.getItem("appLanguage")
      const htmlLang = document?.documentElement?.lang
      // Prefer page language for the label; fallback to stored preference
      if (htmlLang === "ko") {
        setLanguage("Korean")
      } else if (htmlLang === "en") {
        setLanguage("English")
      } else if (stored) {
        setLanguage(stored === "Korean" ? "Korean" : "English")
      }
    } catch {}
  }, [])

  // Keep label in sync if <html lang> changes or a custom event is dispatched
  useEffect(() => {
    const onLanguageChange = (e: Event) => {
      try {
        const detail = (e as CustomEvent<string>).detail
        setLanguage(detail === "Korean" ? "Korean" : "English")
      } catch {}
    }
    const observer = new MutationObserver(() => {
      try {
        const htmlLang = document.documentElement.lang
        if (htmlLang === "ko") setLanguage("Korean")
        else if (htmlLang === "en") setLanguage("English")
      } catch {}
    })
    try {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })
    } catch {}
    window.addEventListener("appLanguageChange", onLanguageChange as EventListener)
    return () => {
      try { observer.disconnect() } catch {}
      window.removeEventListener("appLanguageChange", onLanguageChange as EventListener)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2 font-sans bg-transparent", className)}>
          <Globe className="h-4 w-4" />
          {language}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem
          onClick={() => {
            setLanguage("English")
            try {
              localStorage.setItem("appLanguage", "English")
              window.dispatchEvent(new CustomEvent("appLanguageChange", { detail: "English" }))
              document.documentElement.lang = "en"
            } catch {}
            // Navigate to English homepage if currently on Korean route
            try {
              if (pathname && pathname !== "/") {
                router.push("/")
              }
            } catch {}
          }}
          className="font-sans"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setLanguage("Korean")
            try {
              localStorage.setItem("appLanguage", "Korean")
              window.dispatchEvent(new CustomEvent("appLanguageChange", { detail: "Korean" }))
              document.documentElement.lang = "ko"
            } catch {}
            // Navigate to Korean homepage if not already on it
            try {
              if (pathname && pathname !== "/ko") {
                router.push("/ko")
              }
            } catch {}
          }}
          className="font-sans"
        >
          Korean
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}