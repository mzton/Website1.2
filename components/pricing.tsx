"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Megaphone, ShoppingCart, Briefcase, Shield } from "lucide-react"
import { useState } from "react"
import LoginModal from "@/components/login-modal"

const plans = [
  {
    name: "Content & Presence",
    price: "$299",
    period: "/mo",
    subtitle: "Build your global brand visibility",
    bestFor: "Brands ready to speak English professionally",
    icon: Megaphone,
    outcome: {
      icon: "📢",
      text: "Consistent, professional English content across all channels"
    },
    features: [
      "Social media content creation (Facebook, Instagram, TikTok)",
      "Email marketing content",
      "YouTube & news outlet content",
      "Video production & editing",
      "Image creation (catalogues, ads, presentations)",
      "Weekly performance report",
      "Email support",
    ],
    ctaText: "Start Creating Content",
    ctaVariant: "outline",
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
    outcome: {
      icon: "🛒",
      text: "Complete e-commerce management with live customer support"
    },
    features: [
      "Everything in Content & Presence, plus:",
      "Online marketplace management (Amazon, Shopee)",
      "Market research & competitor analysis",
      "Live chat support during Korean office hours",
      "Product listing optimization",
      "Customer inquiry management",
      "Inventory & order coordination support",
      "Priority response time",
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
    outcome: {
      icon: "🚀",
      text: "2-person dedicated team finding buyers and closing deals"
    },
    features: [
      "Everything in Sales & Commerce, plus:",
      "Active buyer prospecting & outreach",
      "2 dedicated business development specialists",
      "Partnership negotiation support",
      "B2B relationship management",
      "Trade show & event coordination",
      "Enterprise-level priority support",
      "Custom reporting & strategy sessions",
    ],
    ctaText: "Build My Global Team",
    ctaVariant: "default",
    highlighted: false,
    performanceGuarantee: "Dedicated team working exclusively on your growth"
  },
]

// trustSignals removed as section was deleted

const successMetrics = [
  { value: "300+", label: "Content pieces created monthly" },
  { value: "24/5", label: "Live chat coverage" },
  { value: "50+", label: "Businesses served" },
]

const serviceBreakdown = [
  {
    category: "Social Media Management",
    starter: ["FB, IG, TikTok content", "3-5 posts per week"],
    growth: ["FB, IG, TikTok content", "Daily posting", "Email marketing"],
    enterprise: ["Full social strategy", "Daily posting + stories", "Influencer coordination"]
  },
  {
    category: "Content Creation",
    starter: ["Video editing", "Image design", "Basic templates"],
    growth: ["Professional video production", "Custom graphics", "Product photography editing"],
    enterprise: ["Premium video production", "Brand photoshoots", "Animated content"]
  },
  {
    category: "E-commerce Support",
    starter: ["—"],
    growth: ["Amazon & Shopee management", "Product listing optimization", "Order coordination"],
    enterprise: ["Multi-platform strategy", "Inventory forecasting", "Logistics coordination"]
  },
  {
    category: "Customer Communication",
    starter: ["Email support"],
    growth: ["Live chat (KR office hours)", "Email & social DMs", "24h response time"],
    enterprise: ["Priority live support", "Dedicated account managers", "Instant response"]
  },
  {
    category: "Business Development",
    starter: ["—"],
    growth: ["Market research", "Competitor tracking"],
    enterprise: ["Active buyer outreach", "Partnership development", "Trade show support"]
  },
]

export default function Pricing() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-7xl text-center">
        
          
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Pricing</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground text-balance mx-auto max-w-5xl">
            Your Product Needs More Than Visibility. It Needs a Voice.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            English-speaking Filipino professionals who create content, manage sales, and build relationships for your global business
          </p>
          <p className="mt-3 mb-10 text-muted-foreground max-w-3xl mx-auto">
            Cancel anytime • No long-term contracts • Start in 7 days
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            
            return (
              <div key={plan.name} className="relative">
                <Card
                  className={`group border p-8 h-full flex flex-col bg-background transition-all duration-300
                  ${plan.highlighted 
                    ? 'ring-2 ring-primary/60 shadow-xl' 
                    : 'hover:ring-1 hover:ring-primary/30 hover:shadow-xl'
                  }
                  hover:translate-y-[-4px]`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap shadow-lg">
                      {plan.badge}
                    </div>
                  )}

                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${plan.highlighted ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`h-5 w-5 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="text-lg font-semibold">{plan.name}</div>
                  </div>

                  {/* Subtitle */}
                  <div className="text-sm text-muted-foreground mb-4">{plan.subtitle}</div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-6 p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Best for:</div>
                    <div className="text-sm font-medium">{plan.bestFor}</div>
                  </div>

                  {/* Outcome */}
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{plan.outcome.icon}</span>
                      <div className="text-sm font-medium text-foreground">{plan.outcome.text}</div>
                    </div>
                  </div>

                  {/* ROI Highlight (for Growth tier) */}
                  {plan.roi && (
                    <div className="mb-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                        {plan.roi.title}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-500 mt-1">
                        {plan.roi.subtitle}
                      </div>
                    </div>
                  )}

                  {/* Performance Guarantee (for Enterprise tier) */}
                  {plan.performanceGuarantee && (
                    <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          {plan.performanceGuarantee}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full transition-all duration-300 ${
                      plan.highlighted 
                        ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl' 
                        : ''
                    }`}
                    variant={plan.ctaVariant}
                    size="lg"
                    onClick={() => setLoginOpen(true)}
                  >
                    {plan.ctaText}
                  </Button>

                  {/* Additional Info */}
                  <div className="mt-4 text-center text-xs text-muted-foreground">
                    Cancel anytime • No setup fees
                  </div>
                </Card>
              </div>
            )
          })}
          </div>
        </div>

        {/* Comparison Toggle */}
        <div className="mx-auto max-w-7xl text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? 'Hide' : 'Show'} Detailed Comparison
          </Button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="mx-auto max-w-7xl mb-16 overflow-x-auto bg-background rounded-xl border p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold">Service Category</th>
                  <th className="text-left py-4 px-4 font-semibold">Content & Presence</th>
                  <th className="text-left py-4 px-4 font-semibold">Sales & Commerce</th>
                  <th className="text-left py-4 px-4 font-semibold">Enterprise Growth</th>
                </tr>
              </thead>
              <tbody>
                {serviceBreakdown.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-4 px-4 font-medium">{row.category}</td>
                    <td className="py-4 px-4">
                      <ul className="space-y-1">
                        {row.starter.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4">
                      <ul className="space-y-1">
                        {row.growth.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4">
                      <ul className="space-y-1">
                        {row.enterprise.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Success Metrics */}
        <div className="mx-auto max-w-7xl mb-16 p-8 bg-muted/30 rounded-2xl border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">What We Deliver</h3>
            <p className="text-muted-foreground">Real numbers from our operations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Removed trust signals and FAQ teaser as requested */}

      {/* Login Modal (shared component) */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} initialMode="signup" />
    </section>
  )
}