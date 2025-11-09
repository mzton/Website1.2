import type React from "react"
import type { Metadata } from "next"
import { Nunito, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import LiveChat from "@/components/live-chat"
import Script from "next/script"
import ChatWidget from "@/components/chat"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "BOOSTK - Your Global Business Team",
    template: "%s | BOOSTK",
  },
  description:
    "Connect Korean and Japanese companies with English-speaking Filipino professionals.",
  applicationName: "BOOSTK",
  keywords: [
    "global department",
    "outsourcing",
    "social media",
    "sales enablement",
    "English professionals",
  ],
  authors: [{ name: "BOOSTK" }],
  creator: "BOOSTK",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "BOOSTK - Your Global Business Team",
    description:
      "Build your global brand presence and sales with English-speaking Filipino professionals.",
    url: "/",
    siteName: "BOOSTK",
    images: [{ url: "/placeholder.jpg", width: 1200, height: 630, alt: "BOOSTK" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOOSTK - Your Global Business Team",
    description:
      "Global content, sales, and support delivered by English-speaking Filipino professionals.",
    images: ["/placeholder.jpg"],
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#111827",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const defaultLang = process.env.NEXT_PUBLIC_DEFAULT_LANG === "ko" ? "ko" : "en"
  return (
    <html lang={defaultLang} translate="no" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${nunito.variable} ${inter.variable} notranslate`} translate="no">
        <ThemeProvider>
          {/* Hidden link to prefetch Korean route for faster toggling */}
          <Link href="/ko" prefetch className="sr-only" aria-hidden>
            Prefetch Korean Route
          </Link>
          {children}
          <Toaster />
          {/* Live chat widget (loads only if NEXT_PUBLIC_CRISP_ID is set) */}
          <ChatWidget />
          {/* Initialize appLanguage default from env on first load */}
          <Script id="init-default-language" strategy="afterInteractive">
            {`
              try {
                var defaultLang = ${JSON.stringify(defaultLang)};
                var stored = localStorage.getItem('appLanguage');
                if (!stored) {
                  localStorage.setItem('appLanguage', defaultLang === 'ko' ? 'Korean' : 'English');
                  window.dispatchEvent(new CustomEvent('appLanguageChange', { detail: (defaultLang === 'ko' ? 'Korean' : 'English') }));
                }
              } catch {}
            `}
          </Script>
          <LiveChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
