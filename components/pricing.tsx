"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Megaphone, ShoppingCart, Briefcase, Shield, Play, Image, FileText, MessageSquare, TrendingUp, Heart } from "lucide-react"
import { useState } from "react"
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
      { text: "Social media content (FB, IG, TikTok)", icon: "image" },
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
      { text: "Marketplace management (Amazon, Shopee)", icon: "cart" },
      { text: "Market research & competitor analysis", icon: "trend" },
      { text: "Live chat (Korean office hours)", icon: "message" },
      { text: "Product listing optimization", icon: "image" },
      { text: "Social media content (FB, IG, TikTok)", icon: "image" },
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
      { text: "Marketplace management (Amazon, Shopee)", icon: "cart" },
      { text: "Market research & competitor analysis", icon: "trend" },
      { text: "Live chat (Korean office hours)", icon: "message" },
      { text: "Product listing optimization", icon: "image" },
      { text: "Social media content (FB, IG, TikTok)", icon: "image" },
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

export default function VisualPricing() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [activePreview, setActivePreview] = useState<{planIndex: number, showcaseIndex: number} | null>(null)

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 scroll-mt-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Pricing</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            See What You Get
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Not just services—real deliverables you can see and measure
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
                      {plan.badge}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.color ?? 'from-primary/30 to-accent/30'} flex items-center justify-center shadow-sm`}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="text-lg font-semibold">{plan.name}</div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">{plan.subtitle}</div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg text-sm">
                    <span className="text-xs text-muted-foreground">Best for: </span>
                    <span className="font-medium">{plan.bestFor}</span>
                  </div>

                  {/* Visual Showcase - Interactive Preview Area */}
                  <div className="mb-6 space-y-3">
                    <div className="text-sm font-semibold mb-2">What You'll Get:</div>
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
                            <div className="text-xs font-semibold mb-1">{showcase.label}</div>
                            <div className="text-[11px] text-muted-foreground">{showcase.description}</div>
                          </div>
                        </div>

                        {/* Hover Indicator */}
                        {isExpandable && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                            <div className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded">
                              Click to expand
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
                        {plan.roi.title}
                      </div>
                      <div className="text-[11px] text-green-600 dark:text-green-500 mt-1">
                        {plan.roi.subtitle}
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
                    <div className="text-sm font-semibold mb-2">Also Includes:</div>
                    {plan.features.map((feature, idx) => {
                      const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap]
                      return (
                        <div key={idx} className="flex items-start gap-2">
                          <FeatureIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{feature.text}</span>
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
                    {plan.ctaText}
                  </Button>

                  <div className="mt-3 text-center text-xs text-muted-foreground">
                    Cancel anytime • No setup fees
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
                        <h3 className="text-2xl font-bold mb-2">{showcase.label}</h3>
                        <p className="text-muted-foreground">{showcase.description}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">We Believe In You</h2>
          <div className="bg-card/50 backdrop-blur-sm p-12 rounded-2xl border border-border/50">
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              Language should never stop great businesses from becoming global businesses.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}