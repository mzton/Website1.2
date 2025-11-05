"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import LoginModal from "@/components/login-modal"

const plans = [
  {
    name: "Starter",
    price: "$1,099/mo",
    features: [
      "Dedicated team lead",
      "Up to 40 hours/month",
      "Email and Slack support",
      "English Market Opportunity Analysis Report (defining target markets and competitive landscape)",
      "IR Deck/Proposal Review & Feedback (ensuring adherence to international business standards)",
      "1-Month Content Calendar Template (guiding global tone and key messaging pillars)",
      "Establishes the foundational strategy and provides high-level guidance",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$2,099/mo",
    features: [
      "Cross-functional dedicated team",
      "Up to 80 hours/month",
      "Priority support",
      "Weekly Global Marketing Performance Trackers (strategic accountability and KPI reporting)",
      "Full Campaign Execution & Management (running 1–2 core campaigns like Lead Gen)",
      "Partnership Identification & Outreach (vetting and initiating contact with 5+ international partners)",
      "Focuses on active execution and campaign management",
    ],
    highlighted: false,
  },
  {
    name: "Scale",
    price: "Custom",
    features: [
      "Full-time dedicated team",
      "Custom scope and KPIs",
      "SLA-backed engagement",
      "Custom Executive Leadership",
      "Full Project Ownership (e.g., New Market Launch) with executive oversight",
      "Global Communication Playbook Development (for worldwide branding consistency)",
      "Bespoke SLAs and KPIs tailored to high-stakes organizational goals (e.g., fundraising)",
      "Offers full strategic integration and senior-level project ownership",
    ],
    highlighted: false,
  },
]

// Comparison checklist content aligned to pricing tiers
const comparisonRows = [
  {
    label: "Strategy & Market Entry",
    starter: [
      "English Market Opportunity Analysis Report (defining target markets and competitive landscape)",
      "Competitor SWOT brief",
      "Audience persona outline",
    ],
    growth: [
      "Weekly Global Marketing Performance Trackers (strategic accountability and KPI reporting)",
      "KPI definition and cadence",
      "Channel mix recommendations",
    ],
    scale: [
      "Full Project Ownership (e.g., New Market Launch) with executive oversight",
      "Executive oversight and risk management",
      "Go-to-market governance",
    ],
  },
  {
    label: "Investor/Content Prep",
    starter: [
      "IR Deck/Proposal Review & Feedback (ensuring adherence to international business standards)",
      "Content QA for localization",
      "Basic brand voice checklist",
    ],
    growth: [
      "Full Campaign Execution & Management (running 1–2 core campaigns like Lead Gen)",
      "Metrics framework for stakeholder reporting",
      "Editorial calendar ownership",
    ],
    scale: [
      "Global Communication Playbook Development (for worldwide branding consistency)",
      "Brand alignment across regions",
      "C-suite presentation support",
      "Crisis comms guidance",
    ],
  },
  {
    label: "Execution & Outreach",
    starter: [
      "1-Month Content Calendar Template (guiding global tone and key messaging pillars)",
      "Publishing workflow setup",
      "Basic UTM schema",
    ],
    growth: [
      "Partnership Identification & Outreach (vetting and initiating contact with 5+ international partners)",
      "Multi-channel campaign orchestration",
      "UTM taxonomy and reporting dashboard",
      "Landing page content iterations",
    ],
    scale: [
      "Bespoke SLAs and KPIs tailored to high-stakes organizational goals (e.g., fundraising)",
      "Vendor coordination and contract management",
      "Regional rollout playbooks",
    ],
  },
  {
    label: "Tier Goal",
    starter: [
      "Establishes the foundational strategy and provides high-level guidance",
      "Onboarding + quarterly roadmap",
      "Monthly review call",
    ],
    growth: [
      "Focuses on active execution and campaign management",
      "Dedicated Slack channel + weekly standups",
      "<24h response time on business days",
    ],
    scale: [
      "Offers full strategic integration and senior-level project ownership",
      "Executive steering syncs + board-ready quarterly reports",
      "On-call windows and executive escalations",
    ],
  },
  {
    label: "Performance & Analytics",
    starter: [
      "Monthly performance summary",
      "Basic GA4 dashboards",
    ],
    growth: [
      "Weekly KPI dashboard",
      "Cohort analysis + attribution notes",
    ],
    scale: [
      "Executive KPI suite",
      "Board-level reporting + impact modeling",
    ],
  },
  {
    label: "Support & Communication",
    starter: [
      "Email support (≤48h response)",
      "Project portal access",
    ],
    growth: [
      "Dedicated Slack channel",
      "Weekly standups + retro",
    ],
    scale: [
      "War-room coordination for launches",
      "Quarterly executive reviews",
    ],
  },
  {
    label: "Brand & Creative",
    starter: [
      "Brand messaging guide (lite)",
      "3 content templates",
    ],
    growth: [
      "Creative iterations + A/B tests",
      "Video storyboard + script assist",
    ],
    scale: [
      "Creative direction across regions",
      "Production management + localization at scale",
    ],
  },
  {
    label: "Technology & Automation",
    starter: [
      "CRM integration checklist",
      "Link tracking standards",
    ],
    growth: [
      "Marketing automation sequences",
      "Lead scoring + enrichment",
    ],
    scale: [
      "Advanced CDP/CRM integration",
      "Automated reporting + QA monitoring",
    ],
  },
  {
    label: "Compliance & Risk",
    starter: [
      "Privacy review checklist",
      "Consent language templates",
    ],
    growth: [
      "Compliance review for campaigns",
      "Content risk assessment",
    ],
    scale: [
      "Legal coordination",
      "Risk mitigation plans + incident response",
    ],
  },
]

export default function Pricing() {
  const [loginOpen, setLoginOpen] = useState(false)
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Pricing</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose a plan that fits your growth stage.
          </p>
          <p className="text-muted-foreground text-sm">
            Cancel anytime. No long-term contracts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card
                className={`group border p-8 h-full flex flex-col bg-background transition
                hover:ring-1 hover:ring-primary/30 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10
                hover:shadow-lg hover:translate-y-[-2px]`}
              >
                <div className="mb-2 text-sm text-muted-foreground">{plan.name}</div>
                <div className="mb-4 text-2xl font-bold">{plan.price}</div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                 
                  className="mt-auto transition group-hover:bg-primary group-hover:text-primary-foreground"
                 
                  variant="outline"
                
                  onClick={() => setLoginOpen(true)}
                >
                  Request Consultation
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Comparison Checklist removed as requested */}
      </div>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </section>
  )
}
