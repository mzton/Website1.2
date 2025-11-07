"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

type LanguageMenuProps = {
  className?: string
  align?: "start" | "end"
}

export default function LanguageMenu({ className, align = "end" }: LanguageMenuProps) {
  const [language, setLanguage] = useState("English")
  const router = useRouter()

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
            try { localStorage.setItem("appLanguage", "English") } catch {}
            router.push("/")
          }}
          className="font-sans"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setLanguage("Korean")
            try { localStorage.setItem("appLanguage", "Korean") } catch {}
            router.push("/ko")
          }}
          className="font-sans"
        >
          Korean
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}