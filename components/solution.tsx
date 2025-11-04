"use client"

import { Card } from "@/components/ui/card"
import { Handshake } from "lucide-react"
import { motion } from "framer-motion"

export default function Solution() {
  const benefits = [
    "Marketing & Content Strategy",
    "Sales & Lead Generation",
    "Business Planning & Strategy",
    "Global Client Communication",
  ]

  return (
    <section id="solution" className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">The Solution</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight mb-8 text-balance">
            The Philippines — Your Global Business Headquarters.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            We're not just another outsourcing company. Our English-proficient professionals in the Philippines act as
            your in-house Global Department, handling all English-driven operations such as marketing, sales, business
            planning, and client communication. You focus on your product. We'll handle your global communication.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 hover:border-accent/50 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
                  <span className="text-accent font-bold">✓</span>
                </div>
                <span className="text-foreground font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Highlight Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl blur-3xl"></div>
            <Card className="relative border-accent/30 bg-gradient-to-br from-background/60 to-background/40 backdrop-blur-xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 mx-auto">
                  <Handshake className="w-8 h-8 text-accent" />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-black text-foreground">Partnership Model</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're embedded in your business as a remote extension of your team, not a vendor. Your success is
                    our success.
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground italic">
                    "You focus on building the best product. We'll ensure the entire world can understand and buy it."
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}