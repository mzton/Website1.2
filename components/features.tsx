"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Mail, Megaphone, TrendingUp, Target, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Mail,
    title: "Global Communication",
    questions: [
      "When you receive an English email, do you hesitate before replying?",
      "Are your proposals written in clear, confident English that impresses buyers?",
      "What if every message you send spoke perfectly to global clients?",
    ],
    solution: "BOOSTK writes, designs, and communicates in fluent business English — for you.",
    color: "from-blue-500 to-cyan-600",
    video: "/video/hello13.mp4",
  },
  {
    icon: Megaphone,
    title: "Social & Content Strategy",
    questions: [
      "Do your social posts speak only to local audiences?",
      "Are global buyers even seeing your content?",
      "What if posts and visuals were written by an English-speaking team that knows your brand?",
    ],
    solution: "BOOSTK creates scroll-stopping, English-ready content for your global market.",
    color: "from-purple-500 to-pink-600",
    video: "/video/socialmedia.mp4",
  },
  {
    icon: TrendingUp,
    title: "Sales & Market Development",
    questions: [
      "How many potential buyers have you lost because of unclear English?",
      "Do you have someone who can meet international clients confidently?",
      "What if your sales pipeline ran in English — generating revenue every month?",
    ],
    solution: "BOOSTK turns English into your sales advantage, not your weakness.",
    color: "from-green-500 to-emerald-600",
    video: "/video/marketing.mp4",
  },
  {
    icon: Target,
    title: "Global Strategy & Planning",
    questions: [
      "Do you know how your competitors market in the U.S. or Europe?",
      "Are your investor decks and proposals ready for international partners?",
      "What if every document made investors and buyers say, ‘This looks global’?",
    ],
    solution: "BOOSTK builds your English strategy — from research to pitch.",
    color: "from-amber-500 to-orange-600",
    video: "/video/planning.mp4",
  },
]

export default function Features() {
  // Solutions are shown by default for all cards
  const [revealed] = useState<boolean[]>(
    Array.from({ length: features.length }, () => true)
  )
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
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 scroll-mt-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Where Do You Feel the English Barrier Most?
          </h2>
          <p className="text-lg text-muted-foreground">
            Self-diagnose the gap stopping your global growth
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={itemVariants as any}>
                <Card
                  className="h-full flex flex-col border-border/50 bg-background/50 backdrop-blur p-8 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20"
                >
                  {/* Header with icon and title */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br ${feature.color} transition-transform group-hover:scale-105 shadow-sm`}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  </div>

                  {/* Questions always visible */}
                  <div className="relative flex-1">
                    <motion.ul
                      key={`questions-${idx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3 list-none"
                    >
                      {(features[idx] as any).questions.map((q: string) => (
                        <li key={q} className="flex items-start gap-3">
                          <span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-sm bg-gradient-to-br ${feature.color} shadow-sm`}>
                            <span className="text-primary-foreground text-xs leading-none">?</span>
                          </span>
                          <span className="text-muted-foreground">{q}</span>
                        </li>
                      ))}
                    </motion.ul>

                    {/* Optional video demo */}
                    {feature.video && (
                      <div className="mt-4 rounded-xl border border-accent/40 bg-background/60 p-3">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Demo</div>
                        <video
                          className="w-full rounded-lg shadow-sm pointer-events-none"
                          src={feature.video}
                          autoPlay
                          muted
                          playsInline
                          preload="metadata"
                          poster="/placeholder.jpg"
                          disablePictureInPicture
                          controls={false}
                          controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
                          tabIndex={-1}
                        />
                      </div>
                    )}

                    {/* Highlighted solution always visible */}
                    <div className="mt-4">
                      <motion.div
                        key={`solution-${idx}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-xl p-4 bg-gradient-to-br from-accent/15 to-transparent border border-accent/50 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br ${feature.color} shadow-sm flex-shrink-0`}>
                            <span className="text-primary-foreground text-xs">✓</span>
                          </span>
                          <p className="text-foreground/95 font-medium">
                            {(features[idx] as any).solution}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Removed stacked swipeable deck per request */}
      </div>
    </section>
  )
}
