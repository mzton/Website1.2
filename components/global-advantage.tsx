"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

type GlobalAdvantageProps = { language?: "English" | "Korean" }
export default function GlobalAdvantage({ language = "English" }: GlobalAdvantageProps) {
  return (
    <section id="why" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Why Philippines Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-primary/5 to-background/50 p-8 sm:p-12 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className="mb-8 text-4xl font-bold tracking-tight text-foreground">
                {language === "Korean" ? "필리핀은 당신의 글로벌 이점입니다" : "Why the Philippines is Your Global Advantage"}
              </h2>
              <div className="space-y-6">
                {(language === "Korean"
                  ? [
                      { title: "아시아 최고 영어 구사 인력", subtitle: "EF EPI 지수 기준" },
                      { title: "1시간대 시간대 정렬", subtitle: "한국·일본 근무시간과 완벽한 겹침" },
                      { title: "서구 인력 대비 1/3 비용", subtitle: "동일 품질, 압도적으로 낮은 비용" },
                      { title: "20년 이상의 BPO 전문성", subtitle: "글로벌 기업을 위한 검증된 실적" },
                    ]
                  : [
                      { title: "#1 English-Speaking Workforce in Asia", subtitle: "Ranked by EF EPI Index" },
                      { title: "1-Hour Time Zone Alignment", subtitle: "Perfect overlap with Korean & Japanese business hours" },
                      { title: "1/3 the Cost of Western Talent", subtitle: "Same quality, dramatically lower overhead" },
                      { title: "20+ Years of BPO Excellence", subtitle: "Proven track record serving global companies" },
                    ]).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                    className="flex gap-4"
                  >
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-accent/20 shadow-xl"
            >
              <Image
                src="/diverse-filipino-professionals-working-in-modern-o.jpg"
                alt="Filipino professionals in modern office environment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}