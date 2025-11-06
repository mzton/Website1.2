"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"

const results = [
  {
    metric: "$5K in new sales",
    title: "New Sales Generated",
    company: "Alex Kim",
    quote: "From a regular glasses they created a marketing designed glasses",
    images: ["/reviews/before5.jpg", "/reviews/after5.png"],
  },
  {
    metric: "$48K in promo sales",
    title: "Cap Campaign Sales",
    company: "Jamie Reyes",
    quote: "From a simple product shot to high-impact promo artwork",
    images: ["/reviews/before13.jpg", "/reviews/after13.png"],
  },
  {
    metric: "320 units sold",
    title: "Rattan Storage Promo Sales",
    company: "Mia Santos",
    quote: "From in-store snapshot to clean, conversion-ready product ad",
    images: ["/reviews/before18.jpg", "/reviews/after18.png"],
  },
  {
    metric: "€18K in accessory sales",
    title: "Clutch Campaign Revenue",
    company: "Chris Bautista",
    quote: "From catalog shot to premium brand visual",
    images: ["/reviews/before15.jpg", "/reviews/after15.png"],
  },
  {
    metric: "1,500 units sold",
    title: "Backpack Campaign Sales",
    company: "Rafael Tan",
    quote: "From home photo to polished 50% OFF promo",
    images: ["/reviews/before6.jpg", "/reviews/after6.png"],
  },
  {
    metric: "$36K in footwear sales",
    title: "Monk Strap Promo Revenue",
    company: "Daniel Cho",
    quote: "From casual table shot to studio-grade product ad",
    images: ["/reviews/before11.jpg", "/reviews/after11.png"],
  },
  {
    metric: "2.2x engagement",
    title: "Aloha Tee Promo Artwork",
    company: "Sean Rivera",
    quote: "From raw product shot to eye-catching sale graphic",
    images: ["/reviews/before7.jpg", "/reviews/after7.png"],
  },
  {
    metric: "20% OFF campaign",
    title: "Vintage Polo Sale Banner",
    company: "Jasper Asmin",
    quote: "From plain photo to polished discount promo",
    images: ["/reviews/before8.jpg", "/reviews/after8.png"],
  },
  {
    metric: "40% OFF campaign",
    title: "Michael Kors Handbag Promo",
    company: "Emiko Tanaka",
    quote: "From casual snapshot to luxury sale design",
    images: ["/reviews/before14.jpg", "/reviews/after14.png"],
  },
]

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Create seamless infinite loop by duplicating items
  const duplicatedResults = [...results, ...results]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationFrame: number
    let lastTime = performance.now()
    const pixelsPerSecond = 120 // Faster auto-scroll for clearer motion

    const animate = (currentTime: number) => {
      if (!el) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Smoothly increment scroll position
      el.scrollLeft += pixelsPerSecond * deltaTime

      // Calculate the width of one full set of items
      const singleSetWidth = el.scrollWidth / 2

      // When we've scrolled past one full set, reset to beginning
      if (el.scrollLeft >= singleSetWidth) {
        // Jump back by exactly one set width to maintain continuity
        el.scrollLeft -= singleSetWidth
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <section id="results" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            When Your Team Speaks English, Opportunity Arrives
          </h2>
          <p className="text-lg text-muted-foreground">Proven results from companies just like yours</p>
        </motion.div>

        {/* Horizontal carousel of results */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll pb-2 no-scrollbar px-3 sm:px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', willChange: 'scroll-position' }}
          >
            {duplicatedResults.map((result, index) => (
              <div
                key={`${result.metric}-${index}`}
                className="flex-shrink-0"
              >
                <Card className="w-[300px] sm:w-[360px] lg:w-[420px] border-accent/30 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur p-8 overflow-hidden hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{result.metric}</div>
                    <p className="font-semibold text-foreground">{result.title}</p>
                  </div>

                  {/* Before/After image slot */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[0, 1].map((i) => (
                      <div key={i} className="relative h-36 w-full overflow-hidden rounded-lg border border-border/30 bg-muted/10">
                        <Image
                          src={result.images?.[i] || "/placeholder.jpg"}
                          alt={`${i === 0 ? "Before" : "After"} - ${result.title}`}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2 left-2 rounded-md border bg-background/70 px-2 py-1 text-[10px] tracking-wide">
                          {i === 0 ? "Before" : "After"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/40 pt-4 space-y-3 flex-grow">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wide">{result.company}</p>
                    <p className="text-sm italic text-foreground">"{result.quote}"</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
