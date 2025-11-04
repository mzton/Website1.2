"use client"

import { useState, useEffect, useMemo } from "react"
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
        image: "/ads/model_advertisement.png",
        alt: "Doctor ad",
      },
      {
        id: "ads-5",
        image: "/ads/fasion_advertise1.jpg",
        alt: "Facebook ad",
      },
      {
        id: "ads-6",
        image: "/ads/model_advertisment2.png",
        alt: "Instagram ad",
      },
      {
        id: "ads-7",
        image: "/ads/food_advertise.png",
        alt: "Product display",
      },
      {
        id: "ads-8",
        image: "/ads/ig.jpg",
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
        image: "/email/email-template.jpg",
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
  const ROTATION_SPEED_S = 24 // Seconds per full revolution (slower, continuous)
  
  // Configuration constants
  const ITEM_WIDTH = 224 // Matches w-56 (which is 224px)
  const VISIBLE_ITEMS = 8 // Total intended slots around the cylinder
  const DEPTH = 400 // Perspective depth for the center/wrapper
  const RADIUS_SCALE = 1.5 // Widen the cylinder by scaling the computed radius

  const activeItems = categories.find((cat) => cat.id === activeCategory)?.items || []
  const itemCount = activeItems.length
  
  // Use the larger of the two counts to determine the number of slots
  const slots = Math.max(itemCount, VISIBLE_ITEMS)

  // 1. Calculate the fixed angle step and cylinder radius
  const { angleStep, radius } = useMemo(() => {
    const calculatedAngleStep = 360 / slots
    
    // Calculate Radius (R) needed for items to touch edge-to-edge
    // R = (Item Width / 2) / tan(Angle / 2)
    const calculatedRadius = Math.round(
      ((ITEM_WIDTH / 2) / Math.tan((Math.PI / 180) * (calculatedAngleStep / 2))) * RADIUS_SCALE
    )
    // If the count is low, we may need a larger radius to spread them out
    return { angleStep: calculatedAngleStep, radius: calculatedRadius }
  }, [slots, ITEM_WIDTH])


  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  // Remove step-based rotation; use continuous CSS animation on wrapper instead

  // 2. Style to FIX the item position in 3D space
  const getFixedItemStyle = (index: number) => {
    const rotationY = index * angleStep
    // Uniform scale/opacity so no item is emphasized
    const scale = 0.9
    const opacity = 0.95

    return {
      transform: `rotateY(${rotationY}deg) translateZ(${radius}px) scale(${scale})`,
      opacity,
      zIndex: 50,
    }
  }

  // 3. Style to ROTATE the entire carousel wrapper (continuous spin)
  const getWrapperStyle = () => {
    return {
      // Use a CSS variable so keyframes can reference current radius
      ["--radius" as any]: `${radius}px`,
      transformStyle: "preserve-3d",
      animation: `rotateRing ${ROTATION_SPEED_S}s linear infinite`,
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
              perspective: `${DEPTH * 2}px`,
            }}
          >
            {/* The carousel wrapper with rotation applied */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                ...getWrapperStyle(),
              }}
            >
                {/* Render actual items with fixed positions */}
                {activeItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="absolute w-56 h-[260px] duration-2000 ease-in-out rounded-3xl overflow-hidden shadow-2xl border border-border/20"
                    style={{
                      ...getFixedItemStyle(index),
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
          <div className="flex gap-8 md:gap-16 justify-center">
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
        @keyframes rotateRing {
          0%   { transform: translateZ(calc(var(--radius) * -1)) rotateY(0deg); }
          100% { transform: translateZ(calc(var(--radius) * -1)) rotateY(-360deg); }
        }
      `}</style>
    </section>
  )
}
