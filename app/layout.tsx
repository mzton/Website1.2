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
  title: "BOOSTK - Your Global Business Team",
  description: "Connect Korean and Japanese companies with English-speaking Filipino professionals",
    generator: 'v0.app'
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
