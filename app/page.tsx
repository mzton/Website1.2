import Header from "@/components/header"
import Hero from "@/components/hero"
import ImageCarousel from "@/components/image-carousel"
import Features from "@/components/features"
import Solution from "@/components/solution"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ImageCarousel />
      <Features />
      <Solution />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
