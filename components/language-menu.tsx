"use client"

import { useEffect } from "react"
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
import { useAppStore } from "@/hooks/use-app-store"
 

type LanguageMenuProps = {
  className?: string
  align?: "start" | "end"
}

export default function LanguageMenu({ className, align = "end" }: LanguageMenuProps) {
  // Read from the global store using a selector to avoid unnecessary re-renders.
  // This component will only re-render when the language value changes.
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const router = useRouter()
  const pathname = usePathname()
  // Note: No need for local state, localStorage, or MutationObserver.
  // The global store centralizes persistence, DOM updates (<html lang>), and
  // broadcasting compatibility events for legacy listeners.

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2 font-sans bg-transparent", className)}>
          <Globe className="h-4 w-4" />
          {/* Show localized label for the active language */}
          <span className="notranslate" translate="no">{language === "Korean" ? "한국어" : "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem
          onClick={() => {
            // Update global language. The store persists to localStorage,
            // updates <html lang>, and dispatches a compatibility event.
            setLanguage("English")
            // Navigate to English homepage if currently on Korean route
            try {
              if (pathname && pathname !== "/") {
                router.push("/")
              }
            } catch {}
          }}
          className="font-sans"
        >
          <span className="notranslate" translate="no">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // Update global language and navigate to the Korean route when needed.
            setLanguage("Korean")
            // Navigate to Korean homepage if not already on it
            try {
              if (pathname && pathname !== "/ko") {
                router.push("/ko")
              }
            } catch {}
          }}
          className="font-sans"
        >
          <span className="notranslate" translate="no">한국어</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}