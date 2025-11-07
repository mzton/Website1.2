"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Mail, Megaphone, TrendingUp, Target, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuresEn = [
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
  },
]

const featuresKo = [
  {
    icon: Mail,
    title: "글로벌 커뮤니케이션",
    questions: [
      "영어 이메일을 받으면 답장이 망설여지나요?",
      "제안서가 구매자에게 신뢰를 주는 명확하고 자신감 있는 영어로 작성되어 있나요?",
      "당신의 모든 메시지가 글로벌 고객에게 완벽히 전달된다면 어떨까요?",
    ],
    solution: "BOOSTK가 당신을 대신해 유창한 비즈니스 영어로 글을 쓰고, 디자인하고, 소통합니다.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Megaphone,
    title: "소셜·콘텐츠 전략",
    questions: [
      "소셜 게시물이 지역 고객에게만 말하고 있나요?",
      "글로벌 구매자들이 당신의 콘텐츠를 보고 있나요?",
      "브랜드를 이해하는 영어 팀이 글과 비주얼을 만든다면 어떨까요?",
    ],
    solution: "BOOSTK가 글로벌 시장을 위한 영어 친화 콘텐츠를 제작합니다.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: TrendingUp,
    title: "영업·시장 개발",
    questions: [
      "불명확한 영어 때문에 잃은 잠재 고객은 얼마나 되나요?",
      "국제 고객을 자신 있게 만날 사람이 있나요?",
      "영업 파이프라인을 영어로 운영해 매달 매출을 만든다면 어떨까요?",
    ],
    solution: "BOOSTK는 영어를 약점이 아닌 판매의 강점으로 바꿉니다.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Target,
    title: "글로벌 전략·기획",
    questions: [
      "경쟁사가 미국 또는 유럽에서 어떻게 마케팅하는지 알고 있나요?",
      "투자 자료와 제안서는 국제 파트너를 위해 준비되어 있나요?",
      "모든 문서가 투자자와 구매자에게 ‘세계적이다’라는 인상을 준다면 어떨까요?",
    ],
    solution: "BOOSTK가 조사부터 피치까지 영어 전략을 구축합니다.",
    color: "from-amber-500 to-orange-600",
  },
]

export default function Features() {
  // Solutions are shown by default for all cards
  const [revealed] = useState<boolean[]>(
    Array.from({ length: featuresEn.length }, () => true)
  )
  const [appLanguage, setAppLanguage] = useState<string | null>(null)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("appLanguage")
      setAppLanguage(stored)
    } catch {
      setAppLanguage(null)
    }
  }, [])

  const features = appLanguage === "Korean" ? featuresKo : featuresEn
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
            <span className={appLanguage === "Korean" ? "notranslate" : undefined} translate={appLanguage === "Korean" ? "no" : undefined}>
              {appLanguage === "Korean" ? "영어 장벽을 가장 크게 느끼는 곳은 어디인가요?" : "Where Do You Feel the English Barrier Most?"}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            <span className={appLanguage === "Korean" ? "notranslate" : undefined} translate={appLanguage === "Korean" ? "no" : undefined}>
              {appLanguage === "Korean" ? "글로벌 성장을 막는 격차를 스스로 진단해 보세요" : "Self-diagnose the gap stopping your global growth"}
            </span>
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
                          <span className="text-muted-foreground">
                            <span className={appLanguage === "Korean" ? "notranslate" : undefined} translate={appLanguage === "Korean" ? "no" : undefined}>{q}</span>
                          </span>
                        </li>
                      ))}
                    </motion.ul>

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
                            <span className={appLanguage === "Korean" ? "notranslate" : undefined} translate={appLanguage === "Korean" ? "no" : undefined}>
                              {(features[idx] as any).solution}
                            </span>
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
      </div>
    </section>
  )
}
