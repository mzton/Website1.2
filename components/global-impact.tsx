"use client"

import { motion } from "framer-motion"
import { TrendingUp, Globe, CheckCircle } from "lucide-react"

export default function GlobalImpact() {
  const items = [
    { stat: "180%", label: "Lead Growth", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
    { stat: "4", label: "New Partners", icon: Globe, color: "from-blue-500 to-cyan-600" },
    { stat: "3x", label: "Faster Sales", icon: CheckCircle, color: "from-purple-500 to-pink-600" },
  ]

  return (
    <section className="mt-24 pt-16 border-t border-border/40">
      <div className="text-center">
        <p className="mb-12 text-sm font-semibold text-accent uppercase tracking-wide">Global Impact</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {items.map((item) => (
            <motion.div key={item.stat} whileHover={{ scale: 1.05 }} className="text-center">
              <div className={`mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-4xl lg:text-5xl font-black text-primary mb-3">{item.stat}</div>
              <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}