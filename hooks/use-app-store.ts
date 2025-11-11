"use client"

import { create } from "zustand"

type Language = "English" | "Korean"
type Theme = "light" | "dark"

type AppState = {
  language: Language
  theme: Theme
  setLanguage: (lang: Language) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem("appLanguage")
    if (stored === "Korean" || stored === "English") return stored
  } catch {}
  try {
    const envDefault = process.env.NEXT_PUBLIC_DEFAULT_LANG
    if (envDefault === "ko") return "Korean"
    if (envDefault === "en") return "English"
  } catch {}
  try {
    const htmlLang = document.documentElement.lang
    if (htmlLang === "ko") return "Korean"
    if (htmlLang === "en") return "English"
  } catch {}
  return "English"
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || stored === "light") return stored
  } catch {}
  try {
    const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    return prefersDark ? "dark" : "light"
  } catch {}
  return "light"
}

export const useAppStore = create<AppState>((set, get) => ({
  language: getInitialLanguage(),
  theme: getInitialTheme(),
  setLanguage: (lang) => {
    set({ language: lang })
    // Persist and reflect immediately for existing components
    try { localStorage.setItem("appLanguage", lang) } catch {}
    try { document.documentElement.lang = lang === "Korean" ? "ko" : "en" } catch {}
    // Bridge: notify legacy listeners still using appLanguageChange
    try { window.dispatchEvent(new CustomEvent("appLanguageChange", { detail: lang })) } catch {}
  },
  setTheme: (theme) => {
    set({ theme })
    // Persist and reflect class for dark mode
    try { localStorage.setItem("theme", theme) } catch {}
    try {
      const root = document.documentElement
      if (theme === "dark") root.classList.add("dark")
      else root.classList.remove("dark")
    } catch {}
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark"
    get().setTheme(next)
  },
}))