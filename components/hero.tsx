"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  const fullText = "Your Global Ambition, Powered by Filipino Talent."

  // Background image carousel for the right-side visual
  const heroImages = [
    "/filipino-professionals-having-video-conference-wit.jpg",
    "/diverse-filipino-professionals-working-in-modern-o.jpg",
    "/ads/food_advertise_2.jpg",
    "/ads/IT.jpg",
  ]
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // change background every 5s
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="text-left"
          >
            <h1 className="mb-8 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-tight text-balance min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex items-start">
              <span className="block">{fullText}</span>
            </h1>


            <p className="mb-12 text-lg text-muted-foreground sm:text-xl text-balance leading-relaxed max-w-2xl">
              For Korean and Japanese companies aiming for the world stage, we provide a dedicated, English-proficient
              team in the Philippines to act as your Global Department.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row items-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 text-lg font-semibold">
                Request Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/50 hover:bg-accent/10 px-8 text-lg font-medium text-accent bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-accent/30 shadow-2xl">
              {heroImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="Hero background"
                  fill
                  priority={i === 0}
                  className={`object-cover absolute inset-0 transition-opacity duration-1000 ${i === bgIndex ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Global Impact Section - Full Width */}
        <div className="mt-24 pt-16 border-t border-border/40">
          <div className="text-center">
            <p className="mb-12 text-sm font-semibold text-accent uppercase tracking-wide">Global Impact</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { stat: "180%", label: "Lead Growth" },
                { stat: "4", label: "New Partners" },
                { stat: "3x", label: "Faster Sales" },
              ].map((item) => (
                <motion.div key={item.stat} whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-primary mb-3">{item.stat}</div>
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
