"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Megaphone, ShoppingCart, Briefcase, Shield, Play, Image, FileText, MessageSquare, TrendingUp, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import NextImage from "next/image"

const plans = [
  {
    name: "Content & Presence",
    price: "$399",
    period: "/mo",
    subtitle: "Build your global brand visibility",
    bestFor: "Brands ready to speak English professionally",
    icon: Megaphone,
    color: "from-purple-500 to-pink-600",
    outcome: {
      icon: "📢",
      text: "Consistent, professional English content across all channels"
    },
    visualShowcase: [
      {
        type: "gallery",
        label: "Social Media Posts",
        images: ["/pricing/sns.png", "/pricing/anadawan.png", "/pricing/ig1.png"],
        description: "Transform product photos into scroll-stopping content"
      },
      {
        type: "gallery",
        label: "Content Variety",
        images: ["/pricing/sale1.png", "/pricing/sns7.png", "/pricing/a5.png"],
        description: "Stories, posts, ads - all professionally designed"
      },
      {
        type: "video",
        label: "Video Production",
        thumbnail: "/pricing/snsyt.png",
        description: "Professional video editing for YouTube & social"
      }
    ],
    features: [
      { text: "Social media content (Facebook, Instagram, TikTok)", icon: "image" },
      { text: "Email marketing campaigns", icon: "file" },
      { text: "Video production & editing", icon: "play" },
      { text: "Catalogue & ad design", icon: "image" },
      { text: "Weekly performance reports", icon: "trend" },
    ],
    ctaText: "Start Creating Content",
    ctaVariant: "default",
    highlighted: false,
  },
  {
    name: "Sales & Commerce",
    price: "$999",
    period: "/mo",
    subtitle: "Sell globally with full support",
    bestFor: "Companies actively selling in international markets",
    icon: ShoppingCart,
    badge: "Most Popular",
    color: "from-green-500 to-emerald-600",
    outcome: {
      icon: "🛒",
      text: "Complete e-commerce management with live customer support"
    },
    visualShowcase: [
      {
        type: "gallery",
        label: "Product Listings",
        images: ["/pricing/ok4.png", "/pricing/k5.png", "/pricing/ok1.png"],
        description: "Optimize listings for higher conversion rates"
      },
      {
        type: "mockup",
        label: "Live Chat Support",
        image: "/pricing/livechat.png",
        description: "Real-time customer support during Korean hours"
      },
      {
        type: "gallery",
        label: "Multi-Platform Management",
        images: ["/pricing/y1.png", "/pricing/y2.png", "/pricing/ebay.png"],
        description: "Amazon, Shopee, and beyond"
      }
    ],
    features: [
      { text: "Marketplace management (Amazon, Shopee, Lazada)", icon: "cart" },
      { text: "Market research & competitor analysis", icon: "trend" },
      { text: "Live chat (Korean office hours)", icon: "message" },
      { text: "Product listing optimization", icon: "image" },
      { text: "Social media content (Facebook, Instagram, TikTok)", icon: "image" },
      { text: "Email marketing campaigns", icon: "file" },
      { text: "Video production & editing", icon: "play" },
      { text: "Catalogue & ad design", icon: "image" },
      { text: "Weekly performance reports", icon: "trend" },
    ],
    ctaText: "Grow Your Sales",
    ctaVariant: "default",
    highlighted: true,
    roi: {
      title: "Increase sales by just $5,000/mo",
      subtitle: "and you've covered the investment 5x over"
    }
  },
  {
    name: "Enterprise Growth",
    price: "$2,599",
    period: "/mo",
    subtitle: "Full partnership development team",
    bestFor: "Businesses expanding aggressively into global markets",
    icon: Briefcase,
    badge: "Full-Service",
    color: "from-blue-500 to-cyan-600",
    outcome: {
      icon: "🚀",
      text: "2-person dedicated team finding buyers and closing deals"
    },
    visualShowcase: [
      {
        type: "process",
        label: "Partnership Pipeline",
        steps: ["Research", "Outreach", "Negotiate", "Close"],
        description: "From prospect to partnership in 30-60 days"
      },
      {
        type: "gallery",
        label: "Professional Materials",
        images: ["/pricing/3rd.png", "/pricing/2nd.png"],
        description: "Pitch decks, proposals, and trade show materials"
      },
      {
        type: "team",
        label: "Your Dedicated Team",
        description: "2 specialists working full-time on your growth"
      }
    ],
    features: [
      { text: "Active buyer prospecting", icon: "trend" },
      { text: "2 dedicated BD specialists", icon: "briefcase" },
      { text: "Partnership negotiation support", icon: "message" },
      { text: "Enterprise priority support", icon: "shield" },
      { text: "Marketplace management (Amazon, Shopee, Lazada)", icon: "cart" },
      { text: "Market research & competitor analysis", icon: "trend" },
      { text: "Live chat (Korean office hours)", icon: "message" },
      { text: "Product listing optimization", icon: "image" },
      { text: "Social media content (Facebook, Instagram, TikTok)", icon: "image" },
      { text: "Email marketing campaigns", icon: "file" },
      { text: "Video production & editing", icon: "play" },
      { text: "Catalogue & ad design", icon: "image" },
      { text: "Weekly performance reports", icon: "trend" },
    ],
    ctaText: "Build My Global Team",
    ctaVariant: "default",
    highlighted: false,
  },
]

const iconMap = {
  image: Image,
  file: FileText,
  play: Play,
  trend: TrendingUp,
  check: Check,
  cart: ShoppingCart,
  message: MessageSquare,
  briefcase: Briefcase,
  shield: Shield,
}

export default function VisualPricing({ language }: { language?: string }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [activePreview, setActivePreview] = useState<{planIndex: number, showcaseIndex: number} | null>(null)
  const [appLanguage, setAppLanguage] = useState<string | null>(null)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("appLanguage")
      setAppLanguage(stored)
    } catch {
      setAppLanguage(null)
    }
  }, [])

  // Listen for language changes across tabs and same-tab custom events
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "appLanguage") {
        setAppLanguage(e.newValue)
      }
    }
    const onLanguageChange = (e: Event) => {
      try {
        const detail = (e as CustomEvent<string>).detail
        setAppLanguage(detail)
      } catch {}
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener("appLanguageChange", onLanguageChange as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
    window.removeEventListener("appLanguageChange", onLanguageChange as EventListener)
    }
  }, [])

  // Allow explicit language override via prop with localStorage fallback
  const effectiveLanguage = language ?? appLanguage

  // Korean translations for Pricing specifics
  const koPlans: Record<string, { name?: string; subtitle?: string; bestFor?: string; ctaText?: string; roiTitle?: string; roiSubtitle?: string }> = {
    "Content & Presence": {
      name: "글로벌 쇼설미디어로 출발",
      subtitle: "글로벌 브랜드 가시성 구축",
      bestFor: "전문적인 영어로 소통할 준비가 된 브랜드",
      ctaText: "해외사업 기초 시작하기",
    },
    "Sales & Commerce": {
      name: "온라인 쇼핑몰 공략",
      subtitle: "전 세계 판매 완전 지원",
      bestFor: "국제 시장에서 적극적으로 판매하는 기업",
      ctaText: "글로벌 전문 1인 구축플랜",
      roiTitle: "월 매출을 $5,000만 늘려도",
      roiSubtitle: "투자 비용을 5배 이상 회수합니다",
    },
    "Enterprise Growth": {
      name: "글로벌 기업형업무",
      subtitle: "풀 파트너십 개발 팀",
      bestFor: "글로벌 시장으로 공격적으로 확장하는 기업",
      ctaText: "글로벌 전문 2인 팀 구축플랜",
    },
  }

  const koBadge: Record<string, string> = {
    "Most Popular": "가장 인기",
    "Full-Service": "풀 서비스",
  }

  const koShowcaseLabel: Record<string, string> = {
    "Social Media Posts": "소셜 미디어 게시물",
    "Content Variety": "콘텐츠 다양성",
    "Video Production": "영상 제작",
    "Product Listings": "상품 등록",
    "Live Chat Support": "실시간 채팅 지원",
    "Multi-Platform Management": "멀티 플랫폼 관리",
    "Partnership Pipeline": "파트너십 파이프라인",
    "Professional Materials": "프로페셔널 자료",
    "Your Dedicated Team": "전담 팀",
  }

  const koShowcaseDesc: Record<string, string> = {
    "Transform product photos into scroll-stopping content": "제품 사진을 스크롤을 멈추게 하는 콘텐츠로 변환",
    "Stories, posts, ads - all professionally designed": "스토리, 게시물, 광고 — 모두 전문적으로 디자인",
    "Professional video editing for YouTube & social": "유튜브 및 소셜용 전문 영상 편집",
    "Optimize listings for higher conversion rates": "전환율을 높이도록 등록을 최적화",
    "Real-time customer support during Korean hours": "한국 근무시간 내 실시간 고객 지원",
    "Amazon, Shopee, and beyond": "아마존, 쇼피 등 다양한 플랫폼",
    "From prospect to partnership in 30-60 days": "잠재 고객에서 파트너십까지 30–60일",
    "Pitch decks, proposals, and trade show materials": "피치덱, 제안서, 박람회 자료",
    "2 specialists working full-time on your growth": "성장을 위해 풀타임으로 일하는 2명의 전문가",
  }

  const koFeatures: Record<string, string> = {
    "Social media content (Facebook, Instagram, TikTok)": "소셜 미디어 콘텐츠 (페이스북, 인스타그램, 틱톡)",
    "Email marketing campaigns": "이메일 마케팅 캠페인",
    "Video production & editing": "영상 제작 및 편집",
    "Catalogue & ad design": "카탈로그 및 광고 디자인",
    "Weekly performance reports": "주간 성과 보고서",
    "Marketplace management (Amazon, Shopee, Lazada)": "해외쇼핑몰 입점,판매,관리(아마존,쇼피,라자다)",
    "Market research & competitor analysis": "시장 조사 및 경쟁사 분석",
    "Live chat (Korean office hours)": "실시간 채팅 (한국 근무시간)",
    "Product listing optimization": "상품 등록 최적화",
    "Active buyer prospecting": "잠재 바이어 적극 발굴",
    "2 dedicated BD specialists": "전담 BD 전문가 2명",
    "Partnership negotiation support": "파트너십 협상 지원",
    "Enterprise priority support": "엔터프라이즈 우선 지원",
  }

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 scroll-mt-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            {effectiveLanguage === "Korean" ? (
              <span className="notranslate" translate="no">요금제</span>
            ) : (
              "Pricing"
            )}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {effectiveLanguage === "Korean" ? (
              <span className="notranslate" translate="no">일단 서비스를 받아보세요</span>
            ) : (
              "See What You Get"
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {effectiveLanguage === "Korean" ? (
              <span className="notranslate" translate="no">단순한 서비스가 아닙니다 — 직접 보고 측정할 수 있는 실질적인 결과물</span>
            ) : (
              "Not just services—real deliverables you can see and measure"
            )}
          </p>
        </div>

        {/* Pricing Cards with Visual Previews */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, planIndex) => {
            const Icon = plan.icon
            
            return (
              <div key={plan.name} className="relative">
                <Card
                  className={`border p-6 bg-background transition-all duration-300
                  ${plan.highlighted 
                    ? 'ring-2 ring-primary/60 shadow-xl' 
                    : 'hover:ring-1 hover:ring-primary/30 hover:shadow-lg'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koBadge[plan.badge] ?? plan.badge}</span>
                      ) : (
                        plan.badge
                      )}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.color ?? 'from-primary/30 to-accent/30'} flex items-center justify-center shadow-sm`}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="text-lg font-semibold">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koPlans[plan.name]?.name ?? plan.name}</span>
                      ) : (
                        plan.name
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    {effectiveLanguage === "Korean" ? (
                      <span className="notranslate" translate="no">{koPlans[plan.name]?.subtitle ?? plan.subtitle}</span>
                    ) : (
                      plan.subtitle
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg text-sm">
                    <span className="text-xs text-muted-foreground">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">추천 대상: </span>
                      ) : (
                        "Best for: "
                      )}
                    </span>
                    <span className="font-medium">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">{koPlans[plan.name]?.bestFor ?? plan.bestFor}</span>
                      ) : (
                        plan.bestFor
                      )}
                    </span>
                  </div>

                  {/* Visual Showcase - Interactive Preview Area */}
                  <div className="mb-6 space-y-3">
                    <div className="text-sm font-semibold mb-2">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">글로벌 서비스품목:</span>
                      ) : (
                        "What You'll Get:"
                      )}
                    </div>
                    {plan.visualShowcase.map((showcase, showcaseIndex) => {
                      const isExpandable = showcase.type === "gallery"
                      return (
                      <div 
                        key={showcaseIndex}
                        className={`relative group ${isExpandable ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={isExpandable ? () => setActivePreview({planIndex, showcaseIndex}) : undefined}
                      >
                        {/* Preview Card */}
                        <div className="border rounded-lg overflow-hidden bg-muted/30 hover:bg-muted/50 transition">
                          

                          {/* Gallery Preview */}
                          {showcase.type === "gallery" && (
                            <div className={`grid ${showcase.images && showcase.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'} gap-1 p-2`}>
                              {showcase.images?.map((img, i) => (
                                <div key={i} className="relative h-24 sm:h-28 md:h-32 rounded overflow-hidden bg-muted">
                                  <NextImage src={img} alt={`Example ${i+1}`} fill className="object-contain" />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Video Preview */}
                          {showcase.type === "video" && (
                            <div className="relative h-32 p-2">
                              <NextImage src={showcase.thumbnail || ""} alt="Video" fill className="object-cover rounded" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-3">
                                  <Play className="h-6 w-6 text-white fill-white" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Mockup Preview */}
                          {showcase.type === "mockup" && (
                            <div className="relative h-32 p-2">
                              <NextImage src={showcase.image || ""} alt="Mockup" fill className="object-cover rounded" />
                            </div>
                          )}

                          {/* Process Preview */}
                          {showcase.type === "process" && (
                            <div className="p-4">
                              <div className="flex items-center justify-between gap-2">
                                {showcase.steps?.map((step, i) => (
                                  <div key={i} className="flex flex-col items-center flex-1">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mb-1">
                                      {i+1}
                                    </div>
                                    <div className="text-[10px] text-center">{step}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Team Preview */}
                          {showcase.type === "team" && (
                            <div className="p-4 flex items-center justify-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Briefcase className="h-6 w-6 text-primary" />
                              </div>
                              <div className="text-2xl">+</div>
                              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Briefcase className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                          )}

                          {/* Label & Description */}
                          <div className="p-3 pt-2 border-t">
                            <div className="text-xs font-semibold mb-1">
                              {effectiveLanguage === "Korean" ? (
                                <span className="notranslate" translate="no">{koShowcaseLabel[showcase.label] ?? showcase.label}</span>
                              ) : (
                                showcase.label
                              )}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {effectiveLanguage === "Korean" ? (
                                <span className="notranslate" translate="no">{koShowcaseDesc[showcase.description] ?? showcase.description}</span>
                              ) : (
                                showcase.description
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover Indicator */}
                        {isExpandable && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                            <div className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded">
                              {effectiveLanguage === "Korean" ? (
                                <span className="notranslate" translate="no">클릭하여 확대</span>
                              ) : (
                                "Click to expand"
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      )
                    })}
                  </div>

                  {/* ROI/Guarantee Boxes */}
                  {plan.roi && (
                    <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-xs font-semibold text-green-700 dark:text-green-400">
                        {effectiveLanguage === "Korean" ? (
                          <span className="notranslate" translate="no">{koPlans[plan.name]?.roiTitle ?? plan.roi.title}</span>
                        ) : (
                          plan.roi.title
                        )}
                      </div>
                      <div className="text-[11px] text-green-600 dark:text-green-500 mt-1">
                        {effectiveLanguage === "Korean" ? (
                          <span className="notranslate" translate="no">{koPlans[plan.name]?.roiSubtitle ?? plan.roi.subtitle}</span>
                        ) : (
                          plan.roi.subtitle
                        )}
                      </div>
                    </div>
                  )}

                  {plan.performanceGuarantee && (
                    <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-xs font-medium text-blue-700 dark:text-blue-400">
                          {plan.performanceGuarantee}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features List (Compact) */}
                  <div className="mb-6 space-y-2">
                    <div className="text-sm font-semibold mb-2">
                      {effectiveLanguage === "Korean" ? (
                        <span className="notranslate" translate="no">
                          {plan.name === "Content & Presence"
                            ? "해외사업 마케팅 초기 플랜"
                            : plan.name === "Enterprise Growth"
                            ? "글로벌 2인 팀 구축플랜"
                            : "글로벌 1인업무 구축플랜"}
                        </span>
                      ) : (
                        "Also Includes:"
                      )}
                    </div>
                    {plan.features.map((feature, idx) => {
                      const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap]
                      return (
                        <div key={idx} className="flex items-start gap-2">
                          <FeatureIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">
                            {effectiveLanguage === "Korean" ? (
                              <span className="notranslate" translate="no">
                                {plan.name === "Enterprise Growth" && feature.text === "Weekly performance reports"
                                  ? "글로벌 전문 2인 팀 구축플랜"
                                  : (koFeatures[feature.text] ?? feature.text)}
                              </span>
                            ) : (
                              feature.text
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full ${plan.highlighted ? 'shadow-lg' : ''} bg-gradient-to-r text-white 
                      ${plan.name === 'Content & Presence' ? '!from-purple-500 !to-pink-600' : ''}
                      ${plan.name === 'Sales & Commerce' ? '!from-green-500 !to-emerald-600' : ''}
                      ${plan.name === 'Enterprise Growth' ? '!from-blue-500 !to-cyan-600' : ''}
                      hover:!from-sky-500 hover:!to-blue-700`}
                    variant={plan.ctaVariant as any}
                    size="lg"
                    onClick={() => setLoginOpen(true)}
                  >
                    {effectiveLanguage === "Korean" ? (
                      <span className="notranslate" translate="no">
                        {koPlans[plan.name]?.ctaText ??
                          (plan.name === "Content & Presence" ? "글로벌 쇼설미디어로 출발":
                           plan.name === "Sales & Commerce" ? "글로벌 전문 1인 구축플랜" :
                           plan.name === "Enterprise Growth" ? "글로벌 전문 2인 팀 구축플랜" :
                           plan.ctaText)}
                      </span>
                    ) : (
                      plan.ctaText
                    )}
                  </Button>

                  <div className="mt-3 text-center text-xs text-muted-foreground">
                    {effectiveLanguage === "Korean" ? (
                      <span className="notranslate" translate="no">언제든지 취소 가능 • 초기 비용 없음</span>
                    ) : (
                      "Cancel anytime • No setup fees"
                    )}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Expanded Preview Modal */}
        {activePreview && plans[activePreview.planIndex].visualShowcase[activePreview.showcaseIndex].type === 'gallery' && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setActivePreview(null)}
          >
            <div 
              className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-4 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const showcase = plans[activePreview.planIndex].visualShowcase[activePreview.showcaseIndex]
                return (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {effectiveLanguage === "Korean" ? (
                            <span className="notranslate" translate="no">{koShowcaseLabel[showcase.label] ?? showcase.label}</span>
                          ) : (
                            showcase.label
                          )}
                        </h3>
                        <p className="text-muted-foreground">
                          {effectiveLanguage === "Korean" ? (
                            <span className="notranslate" translate="no">{koShowcaseDesc[showcase.description] ?? showcase.description}</span>
                          ) : (
                            showcase.description
                          )}
                        </p>
                      </div>
                      <button 
                        onClick={() => setActivePreview(null)}
                        className="text-muted-foreground hover:text-foreground text-2xl"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Expanded Content */}

                    {showcase.type === "gallery" && (
                      <div className={`grid ${showcase.images && showcase.images.length === 2 ? 'sm:grid-cols-2 md:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3'} gap-4`}>
                        {showcase.images?.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                            <NextImage src={img} alt={`Example ${i+1}`} fill className="object-contain" />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        )}

        {/* Login Modal Placeholder */}
        {loginOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setLoginOpen(false)}>
            <div className="bg-background p-6 sm:p-8 rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold mb-4">Let's Get Started</h3>
              <p className="text-muted-foreground mb-6">
                Schedule a call to see more examples and discuss your needs.
              </p>
              <Button className="w-full" size="lg" onClick={() => setLoginOpen(false)}>
                Request Consultation
              </Button>
            </div>
          </div>
        )}
      {/* Inspiration block (moved inside component, fixed markup) */}
      <div className="mt-24 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-24 h-24 mx-auto mb-8 animate-pulse text-pink-500" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {effectiveLanguage === "Korean" ? (
              <span className="notranslate" translate="no">글로벌 시장개척 더이상 미루어서는 안됩니다.</span>
            ) : (
              "We Believe In You"
            )}
          </h2>
          <div className="bg-card/50 backdrop-blur-sm p-12 rounded-2xl border border-border/50">
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              {effectiveLanguage === "Korean" ? (
                <span className="notranslate" translate="no">세계를 향한 작은 출발을 저희가 함께 하겠습니다.</span>
              ) : (
                "We'll take the first small step toward the world together."
              )}
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}