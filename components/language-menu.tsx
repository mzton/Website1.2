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
import { setGoogleTranslateLanguage } from "./google-translate"

type LanguageMenuProps = {
  className?: string
  align?: "start" | "end"
}

export default function LanguageMenu({ className, align = "end" }: LanguageMenuProps) {
  const [language, setLanguage] = useState("English")

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
            setGoogleTranslateLanguage("en")
          }}
          className="font-sans"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setLanguage("Korean")
            setGoogleTranslateLanguage("ko")
          }}
          className="font-sans"
        >
          Korean
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}