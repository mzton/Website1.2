"use client"

import { Card } from "@/components/ui/card"
import { Star, MessageSquare, Users, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const resultsEn = [
  {
    metric: "$5K in new sales",
    title: "New Sales Generated",
    company: "Alex Kim",
    quote: "From a regular glasses they created a marketing designed glasses",
    images: ["/reviews/before5.jpg", "/reviews/after5.png"],
  },
  {
    metric: "$48K in promo sales",
    title: "Cap Campaign Sales",
    company: "Jamie Reyes",
    quote: "From a simple product shot to high-impact promo artwork",
    images: ["/reviews/before13.jpg", "/reviews/after13.png"],
  },
  {
    metric: "320 units sold",
    title: "Rattan Storage Promo Sales",
    company: "Mia Santos",
    quote: "From in-store snapshot to clean, conversion-ready product ad",
    images: ["/reviews/before18.jpg", "/reviews/after18.png"],
  },
  {
    metric: "€18K in accessory sales",
    title: "Clutch Campaign Revenue",
    company: "Chris Bautista",
    quote: "From catalog shot to premium brand visual",
    images: ["/reviews/before15.jpg", "/reviews/after15.png"],
  },
  {
    metric: "1,500 units sold",
    title: "Backpack Campaign Sales",
    company: "Rafael Tan",
    quote: "From home photo to polished 50% OFF promo",
    images: ["/reviews/before6.jpg", "/reviews/after6.png"],
  },
  {
    metric: "$36K in footwear sales",
    title: "Monk Strap Promo Revenue",
    company: "Daniel Cho",
    quote: "From casual table shot to studio-grade product ad",
    images: ["/reviews/before11.jpg", "/reviews/after11.png"],
  },
  {
    metric: "2.2x engagement",
    title: "Aloha Tee Promo Artwork",
    company: "Sean Rivera",
    quote: "From raw product shot to eye-catching sale graphic",
    images: ["/reviews/before7.jpg", "/reviews/after7.png"],
  },
  {
    metric: "20% OFF campaign",
    title: "Vintage Polo Sale Banner",
    company: "Jasper Asmin",
    quote: "From plain photo to polished discount promo",
    images: ["/reviews/before8.jpg", "/reviews/after8.png"],
  },
  {
    metric: "40% OFF campaign",
    title: "Michael Kors Handbag Promo",
    company: "Emiko Tanaka",
    quote: "From casual snapshot to luxury sale design",
    images: ["/reviews/before14.jpg", "/reviews/after14.png"],
  },
]

const resultsKo = [
  {
    metric: "신규 매출 $5K",
    title: "신규 매출 창출",
    company: "Alex Kim",
    quote: "일반 안경 사진을 마케팅용 디자인 이미지로 변환",
    images: ["/reviews/before5.jpg", "/reviews/after5.png"],
  },
  {
    metric: "프로모션 매출 $48K",
    title: "모자 캠페인 매출",
    company: "Jamie Reyes",
    quote: "단순 제품 사진을 고충격 프로모 아트워크로 제작",
    images: ["/reviews/before13.jpg", "/reviews/after13.png"],
  },
  {
    metric: "320개 판매",
    title: "라탄 수납 프로모 매출",
    company: "Mia Santos",
    quote: "매장 사진을 깔끔한 전환 최적화 광고로 변경",
    images: ["/reviews/before18.jpg", "/reviews/after18.png"],
  },
  {
    metric: "액세서리 매출 €18K",
    title: "클러치 캠페인 매출",
    company: "Chris Bautista",
    quote: "카탈로그 사진을 프리미엄 브랜드 비주얼로 업그레이드",
    images: ["/reviews/before15.jpg", "/reviews/after15.png"],
  },
  {
    metric: "1,500개 판매",
    title: "백팩 캠페인 매출",
    company: "Rafael Tan",
    quote: "가정 사진을 세련된 50% 할인 프로모로 제작",
    images: ["/reviews/before6.jpg", "/reviews/after6.png"],
  },
  {
    metric: "신발 매출 $36K",
    title: "몽크 스트랩 프로모 매출",
    company: "Daniel Cho",
    quote: "캐주얼 테이블 사진을 스튜디오급 제품 광고로 제작",
    images: ["/reviews/before11.jpg", "/reviews/after11.png"],
  },
  {
    metric: "참여율 2.2배",
    title: "알로하 티 프로모 아트워크",
    company: "Sean Rivera",
    quote: "원시 제품 사진을 시선 강탈 세일 그래픽으로 변경",
    images: ["/reviews/before7.jpg", "/reviews/after7.png"],
  },
  {
    metric: "20% 할인 캠페인",
    title: "빈티지 폴로 세일 배너",
    company: "Jasper Asmin",
    quote: "평범한 사진을 정교한 할인 프로모로 제작",
    images: ["/reviews/before8.jpg", "/reviews/after8.png"],
  },
  {
    metric: "40% 할인 캠페인",
    title: "마이클 코어스 핸드백 프로모",
    company: "Emiko Tanaka",
    quote: "일상 스냅샷을 럭셔리 세일 디자인으로 업그레이드",
    images: ["/reviews/before14.jpg", "/reviews/after14.png"],
  },
]

type TestimonialsProps = { language?: "English" | "Korean" }
export default function Testimonials({ language }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [appLanguage, setAppLanguage] = useState<"English" | "Korean">("English")
  const isMobile = useIsMobile()
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(true)

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

  // Create seamless infinite loop by duplicating items
  const baseResults = resultsEn
  const duplicatedResults = [...baseResults, ...baseResults]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Respect reduced motion preference
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Disable animation on mobile or when user prefers reduced motion
    if (isMobile || prefersReduced) {
      setShouldAnimate(false)
      return
    }

    let animationFrame: number
    let lastTime = performance.now()
    // Slightly lower speed for smoother experience and less layout work
    const pixelsPerSecond = 80

    // Track visibility with IntersectionObserver so we only animate when in view
    let isInView = true
    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries.some((e) => e.isIntersecting)
      },
      { root: null, threshold: 0.1 }
    )
    observer.observe(el)

    const animate = (currentTime: number) => {
      if (!el) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      // Pause when out of view or tab hidden
      if (!isInView || document.hidden) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Smoothly increment scroll position
      el.scrollLeft += pixelsPerSecond * deltaTime

      // Calculate the width of one full set of items
      const singleSetWidth = el.scrollWidth / 2

      // When we've scrolled past one full set, reset to beginning
      if (el.scrollLeft >= singleSetWidth) {
        // Jump back by exactly one set width to maintain continuity
        el.scrollLeft -= singleSetWidth
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [isMobile])

  return (
    <>
    <section id="results" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {effectiveLanguage === "Korean" ? "당신은 최고의 제품을 만드는 데 집중하세요. 우리는 전 세계가 이해하고 구매할 수 있도록 만들겠습니다." : "When Your Team Speaks English, Opportunity Arrives"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {effectiveLanguage === "Korean" ? "작은도전이 큰 결과를 만듭니다" : "Proven results from companies just like yours"}
          </p>
        </motion.div>

        {/* Horizontal carousel of results */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll pb-2 no-scrollbar px-3 sm:px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', willChange: shouldAnimate ? 'scroll-position' : 'auto' }}
          >
            {duplicatedResults.map((result, index) => (
              <div
                key={`${result.metric}-${index}`}
                className="flex-shrink-0"
              >
                <Card className="w-[300px] sm:w-[360px] lg:w-[420px] border-accent/30 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur p-8 overflow-hidden hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
                        >
                          <Star className="h-3 w-3 text-primary-foreground fill-current" />
                        </div>
                      ))}
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{result.metric}</div>
                    <p className="font-semibold text-foreground">{result.title}</p>
                  </div>

                  {/* Before/After image slot */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[0, 1].map((i) => (
                      <div key={i} className="relative h-36 w-full overflow-hidden rounded-lg border border-border/30 bg-muted/10">
                        <Image
                          src={result.images?.[i] || "/placeholder.jpg"}
                          alt={`${i === 0 ? "Before" : "After"} - ${result.title}`}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2 left-2 rounded-md border bg-background/70 px-2 py-1 text-[10px] tracking-wide">
                          {i === 0 ? "Before" : "After"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/40 pt-4 space-y-3 flex-grow">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wide">{result.company}</p>
                    <p className="text-sm italic text-foreground">"{result.quote}"</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Simple 3-step process section */}
    <section id="process" className="bg-gradient-to-br from-background via-background to-primary/5 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {effectiveLanguage === "Korean" ? "간단합니다. 빠릅니다. 효과적입니다." : "Simple. Fast. Effective."}
          </h2>
          <p className="text-xl text-muted-foreground">
            {effectiveLanguage === "Korean" ? "글로벌 성장을 위한 3단계" : "3 steps to global growth"}
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform -translate-y-1/2 opacity-30"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {(effectiveLanguage === "Korean"
              ? [
                  { step: "1", icon: MessageSquare, title: "상담", desc: "우리에게 이야기를 들려주세요", color: "from-purple-500 to-pink-600" },
                  { step: "2", icon: Users, title: "매칭", desc: "당신의 팀을 만나보세요", color: "from-blue-500 to-cyan-600" },
                  { step: "3", icon: Rocket, title: "성장", desc: "성과가 눈앞에 보입니다", color: "from-green-500 to-emerald-600" },
                ]
              : [
                  { step: "1", icon: MessageSquare, title: "Chat", desc: "Tell us your story", color: "from-purple-500 to-pink-600" },
                  { step: "2", icon: Users, title: "Match", desc: "Meet your team", color: "from-blue-500 to-cyan-600" },
                  { step: "3", icon: Rocket, title: "Grow", desc: "Watch it happen", color: "from-green-500 to-emerald-600" },
                ]).map((process, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-20 group-hover:opacity-30 transition-opacity rounded-2xl blur-xl`}></div>
                <div
                  className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-border transition-all transform hover:scale-105 duration-300 text-center cursor-pointer"
                  onClick={() => {
                    if (process.title === "Chat" || process.title === "상담") {
                      window.dispatchEvent(new Event("livechat:open"))
                    }
                  }}
                  role={process.title === "Chat" || process.title === "상담" ? "button" : undefined}
                  aria-label={process.title === "Chat" || process.title === "상담" ? "Open live chat" : undefined}
                >
                  <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${process.color} rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg`}>{process.step}</div>
                  <div className={`w-20 h-20 bg-gradient-to-br ${process.color} rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform`}>
                    <process.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{process.title}</h3>
                  <p className="text-muted-foreground">{process.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
