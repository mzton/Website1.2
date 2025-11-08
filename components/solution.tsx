"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Handshake, Check } from "lucide-react"
import { motion } from "framer-motion"

type SolutionProps = { language?: "English" | "Korean" }
export default function Solution({ language }: SolutionProps) {
  const [appLanguage, setAppLanguage] = useState<"English" | "Korean">("English")
  useEffect(() => {
    try {
      const stored = localStorage.getItem("appLanguage")
      if (stored === "Korean") setAppLanguage("Korean")
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === "appLanguage") {
        setAppLanguage(e.newValue === "Korean" ? "Korean" : "English")
      }
    }
    const onLanguageChange = (e: Event) => {
      try {
        const detail = (e as CustomEvent<"English" | "Korean">).detail
        setAppLanguage(detail === "Korean" ? "Korean" : "English")
      } catch {}
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener("appLanguageChange", onLanguageChange as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("appLanguageChange", onLanguageChange as EventListener)
    }
  }, [])

  const effectiveLanguage = language ?? appLanguage
  const benefits = (
    effectiveLanguage === "Korean"
      ? [
          { label: "마케팅·콘텐츠 전략", color: "from-purple-500 to-pink-600" },
          { label: "영업·리드 생성", color: "from-green-500 to-emerald-600" },
          { label: "비즈니스 기획·전략", color: "from-amber-500 to-orange-600" },
          { label: "글로벌 고객 커뮤니케이션", color: "from-blue-500 to-cyan-600" },
        ]
      : [
          { label: "Marketing & Content Strategy", color: "from-purple-500 to-pink-600" },
          { label: "Sales & Lead Generation", color: "from-green-500 to-emerald-600" },
          { label: "Business Planning & Strategy", color: "from-amber-500 to-orange-600" },
          { label: "Global Client Communication", color: "from-blue-500 to-cyan-600" },
        ]
  )

  return (
    <section id="solution" className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5 scroll-mt-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              {effectiveLanguage === "Korean" ? "해결책" : "The Solution"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight mb-8 text-balance">
            {effectiveLanguage === "Korean" ? "필리핀 — 당신의 글로벌 비즈니스 본사." : "The Philippines — Your Global Business Headquarters."}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {effectiveLanguage === "Korean"
              ? "우리는 단순한 아웃소싱 회사가 아닙니다. 필리핀의 영어 전문 인력이 마케팅, 영업, 사업 기획, 고객 커뮤니케이션 등 영어 중심의 모든 업무를 담당하는 사내 글로벌 부서 역할을 합니다. 당신은 제품에 집중하세요. 우리는 글로벌 커뮤니케이션을 책임집니다."
              : "We're not just another outsourcing company. Our English-proficient professionals in the Philippines act as your in-house Global Department, handling all English-driven operations such as marketing, sales, business planning, and client communication. You focus on your product. We'll handle your global communication."}
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
                key={benefit.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 hover:border-accent/50 transition-all cursor-pointer"
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-sm`}>
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">{benefit.label}</span>
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
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mx-auto shadow-sm">
                  <Handshake className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-black text-foreground">
                    {effectiveLanguage === "Korean" ? "파트너십 모델" : "Partnership Model"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {effectiveLanguage === "Korean"
                      ? "우리는 단순한 공급업체가 아니라, 팀의 원격 확장으로서 당신의 비즈니스에 깊이 관여합니다. 당신의 성공이 곧 우리의 성공입니다."
                      : "We're embedded in your business as a remote extension of your team, not a vendor. Your success is our success."}
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