"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const results = [
  {
    metric: "180%",
    title: "Growth in Global Leads",
    company: "Korean Tech Startup",
    quote: "We finally had a voice in the global market.",
  },
  {
    metric: "4",
    title: "European Distributors Signed",
    company: "Japanese Food Brand",
    quote: "Distribution expanded to markets we never thought possible.",
  },
  {
    metric: "3x",
    title: "Partnership Success Rate",
    company: "Korean Service Company",
    quote: "Our partnership pipeline is now global, not regional.",
  },
]

export default function Testimonials() {
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

        <div className="grid gap-8 md:grid-cols-3">
          {results.map((result, index) => (
            <motion.div
              key={result.metric}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <Card className="border-accent/30 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur p-8 overflow-hidden hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20 h-full flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{result.metric}</div>
                  <p className="font-semibold text-foreground">{result.title}</p>
                </div>
                <div className="border-t border-border/40 pt-4 space-y-3 flex-grow">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide">{result.company}</p>
                  <p className="text-sm italic text-foreground">"{result.quote}"</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
