"use client"

import { Card } from "@/components/ui/card"
import { Mail, Megaphone, TrendingUp, Target } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Mail,
    title: "Global Communication",
    description:
      "Professional emails, contracts, and client presentations. Your message lands perfectly in English, every time.",
  },
  {
    icon: Megaphone,
    title: "Social & Content Strategy",
    description:
      "Instagram, LinkedIn, Facebook — professionally managed in English. High-impact posts that attract real buyers.",
  },
  {
    icon: TrendingUp,
    title: "Sales & Market Development",
    description:
      "Lead generation, buyer meetings, and email campaigns. Revenue-focused operations executed in fluent English.",
  },
  {
    icon: Target,
    title: "Global Strategy & Planning",
    description:
      "Market research, investor decks, partnership proposals. Strategic documents that attract capital and partnerships.",
  },
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your Complete Global Operating System
          </h2>
          <p className="text-lg text-muted-foreground">
            Every function your international business needs—without building a team
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="border-border/50 bg-background/50 backdrop-blur p-8 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 cursor-pointer group">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-all">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
