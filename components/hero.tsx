"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
              <span className="text-sm font-medium text-accent">Global Talent Solutions</span>
            </div>

            <h1 className="mb-8 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-tight text-balance">
              Your Global Ambition, Powered by Filipino Talent.
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

            <div className="mt-16 pt-8 border-t border-border/40">
              <p className="mb-6 text-sm font-semibold text-accent uppercase tracking-wide">Global Impact</p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { stat: "180%", label: "Lead Growth" },
                  { stat: "4", label: "New Partners" },
                  { stat: "3x", label: "Faster Sales" },
                ].map((item) => (
                  <motion.div key={item.stat} whileHover={{ scale: 1.05 }} className="text-center">
                    <div className="text-3xl font-black text-primary mb-1">{item.stat}</div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-accent/30 shadow-2xl">
              <Image
                src="/filipino-professionals-having-video-conference-wit.jpg"
                alt="Filipino professionals in global business meeting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
