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
    price: "$2,499/mo",
    features: [
      "Dedicated team lead",
      "Up to 40 hours/month",
      "Email and Slack support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$4,999/mo",
    features: [
      "Cross-functional dedicated team",
      "Up to 80 hours/month",
      "Priority support",
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
    ],
    highlighted: false,
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
      </div>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </section>
  )
}
