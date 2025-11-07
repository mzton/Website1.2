"use client"

import { useEffect } from "react"

export default function GoogleTranslate() {
  useEffect(() => {
    // Avoid duplicate injection
    if (document.getElementById("google-translate-script")) return

    // Create init function on window
    ;(window as any).googleTranslateElementInit = function () {
      const google = (window as any).google
      if (!google?.translate) return
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ko",
      autoDisplay: false,
    },
    "google_translate_element"
  )
    }

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Hidden container for the Google widget
  return <div id="google_translate_element" style={{ display: "none" }} />
}

// Utility to programmatically change language via the widget combo
export function setGoogleTranslateLanguage(lang: "en" | "ko") {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo")
  if (combo) {
    combo.value = lang
    combo.dispatchEvent(new Event("change"))
    return
  }

  // Fallback: set cookie and reload (if widget not initialized yet)
  const from = "en"
  const to = lang
  const cookieVal = `/${from}/${to}`
  document.cookie = `googtrans=${cookieVal}; path=/` // site cookie
  document.cookie = `googtrans=${cookieVal}; domain=.${location.hostname}; path=/`
  location.reload()
}