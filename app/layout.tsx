import type React from "react"
import type { Metadata } from "next"
import { Nunito, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import GoogleTranslate from "@/components/google-translate"

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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${nunito.variable} ${inter.variable}`}>
        <ThemeProvider>
          <GoogleTranslate />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
