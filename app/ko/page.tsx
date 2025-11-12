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

  return (
    <main className="min-h-screen bg-background" lang="ko">
      <Header language="Korean" />
      <Hero language="Korean" />
      <ImageCarousel language="Korean" />
      <Features language="Korean" />
      <Solution language="Korean" />
      <Testimonials language="Korean" />
      <Pricing language="Korean" />
      <Footer language="Korean" />
    </main>
  )
}
