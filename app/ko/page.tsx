"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ImageCarousel from "@/components/image-carousel"
import Features from "@/components/features"
import Solution from "@/components/solution"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Footer from "@/components/footer"

export default function KoreanHome() {
  // Ensure components render Korean strings by setting appLanguage
  useEffect(() => {
    try {
      window.localStorage.setItem("appLanguage", "Korean")
    } catch {}
  }, [])

  return (
    <main className="min-h-screen bg-background" lang="ko">
      <Header language="Korean" />
      <Hero language="Korean" />
      <ImageCarousel language="Korean" />
      <Features />
      <Solution language="Korean" />
      <Testimonials language="Korean" />
      <Pricing />
      <Footer language="Korean" />
    </main>
  )
}