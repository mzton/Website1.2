"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface CarouselItem {
  id: string
  image: string
  alt: string
}

interface CarouselCategory {
  id: string
  label: string
  items: CarouselItem[]
}

const categories: CarouselCategory[] = [
  {
    id: "videos",
    label: "Videos",
    items: [
      {
        id: "video-1",
        image: "/video/video-marketing-content.jpg",
        alt: "Video content card",
      },
      {
        id: "video-2",
        image: "/video/video-tutorial.png",
        alt: "Video tutorial",
      },
      {
        id: "video-3",
        image: "/video/video-promo.jpg",
        alt: "Video promotion",
      },
      {
        id: "video-4",
        image: "/video/video-marketing-campaign.jpg",
        alt: "Video campaign",
      },
      {
        id: "video-5",
        image: "/video/video-showcase-demo.jpg",
        alt: "Video showcase",
      },
      {
        id: "video-6",
        image: "/video/video-testimonial.jpg",
        alt: "Video testimonial",
      },
      {
        id: "video-7",
        image: "/video/video-marketing-content.jpg",
        alt: "Video content",
      },
      {
        id: "video-8",
        image: "/video/video-tutorial.png",
        alt: "Video guide",
      },
    ],
  },
  {
    id: "ads",
    label: "Ads",
    items: [
      {
        id: "ads-1",
        image: "/ads/food_advertise_2.jpg",
        alt: "Product ad",
      },
      {
        id: "ads-2",
        image: "/ads/IT.jpg",
        alt: "Social ad",
      },
      {
        id: "ads-3",
        image: "/ads/fasion_advertise2.jpg",
        alt: "Banner ad",
      },
      {
        id: "ads-4",
        image: "/ads/doctor.png",
        alt: "Doctor ad",
      },
      {
        id: "ads-5",
        image: "/ads/fasion_advertise1.jpg",
        alt: "Facebook ad",
      },
      {
        id: "ads-6",
        image: "/ads/zoom.png",
        alt: "Instagram ad",
      },
      {
        id: "ads-7",
        image: "/ads/food_advertise.png",
        alt: "Product display",
      },
      {
        id: "ads-8",
        image: "/ads/ads (2).png",
        alt: "Product display",
      },
    ],
  },
  {
    id: "socials",
    label: "Socials",
    items: [
      {
        id: "social-1",
        image: "/ads/instagram-post.jpg",
        alt: "Instagram post",
      },
      {
        id: "social-2",
        image: "/ads/social-media-content.jpg",
        alt: "Social content",
      },
      {
        id: "social-3",
        image: "/video/tiktok-video.jpg",
        alt: "TikTok video",
      },
      {
        id: "social-4",
        image: "/ads/instagram-carousel-post.jpg",
        alt: "Instagram carousel",
      },
      {
        id: "social-5",
        image: "/video/tiktok-video-content.jpg",
        alt: "TikTok content",
      },
      {
        id: "social-6",
        image: "/ads/linkedin-social-post.jpg",
        alt: "LinkedIn post",
      },
      {
        id: "social-7",
        image: "/ads/instagram-post.jpg",
        alt: "Instagram reel",
      },
      {
        id: "social-8",
        image: "/ads/social-media-content.jpg",
        alt: "Social reel",
      },
    ],
  },
  {
    id: "emails",
    label: "Emails",
    items: [
      {
        id: "email-1",
        image: "/email/newsletter.png",
        alt: "Email template",
      },
      {
        id: "email-2",
        image: "/email/newsletter-design.jpg",
        alt: "Newsletter design",
      },
      {
        id: "email-3",
        image: "/email/email-campaign.jpg",
        alt: "Email campaign",
      },
      {
        id: "email-4",
        image: "/email/email-promotional-campaign.jpg",
        alt: "Email promo",
      },
      {
        id: "email-5",
        image: "/email/newsletter-design-template.jpg",
        alt: "Newsletter",
      },
      {
        id: "email-6",
        image: "/email/transactional-email-template.jpg",
        alt: "Transactional email",
      },
      {
        id: "email-7",
        image: "/email/email-template.jpg",
        alt: "Email design",
      },
      {
        id: "email-8",
        image: "/email/newsletter-design.jpg",
        alt: "Newsletter template",
      },
    ],
  },
]

export default function ImageCarousel() {
  const [activeCategory, setActiveCategory] = useState("ads")
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeItems = categories.find((cat) => cat.id === activeCategory)?.items || []

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length)
    }, 1500) // Increased from 1000ms to 1500ms for slower, smoother rotation

    return () => clearInterval(interval)
  }, [activeItems.length])

  const getRotationStyle = (index: number) => {
    const position = (index - currentIndex + activeItems.length) % activeItems.length
    const angle = -position * 90
    const zIndex = 50 - position * 2
    const scale = position === 0 ? 1 : 0.75 + Math.cos((position * Math.PI) / activeItems.length) * 0.15
    const opacity = 0.9 - position * 0.08

    return {
      transform: `rotateY(${angle}deg) translateZ(400px) scale(${scale})`,
      zIndex,
      opacity,
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Display */}
        <div className="mb-16">
          <div
            className="h-[450px] flex items-center justify-center"
            style={{
              perspective: "1000px",
            }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {activeItems.map((item, index) => (
                <div
                  key={item.id}
                  className="absolute w-40 h-[210px] transition-all duration-1000 ease-in-out rounded-3xl overflow-hidden shadow-2xl border border-border/20" // reduced from w-80 h-[420px] to w-40 h-[210px] (half size) and duration from 1500ms to 1000ms for smoother animation
                  style={{
                    ...getRotationStyle(index),
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-8 md:gap-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`pb-4 text-lg font-semibold transition-all relative ${
                  activeCategory === category.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @supports (perspective: 1000px) {
          div[style*='perspective'] {
            perspective: 1000px;
          }
        }
      `}</style>
    </section>
  )
}
