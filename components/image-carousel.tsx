"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

interface CarouselItem {
  id: string
  image?: string
  video?: string
  poster?: string
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
        image: "/ads/socmed.jpg",
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
        image: "/ads/brand.png",
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
        image: "/social/Socials1.png",
        alt: "Instagram post",
      },
      {
        id: "social-2",
        video: "/social/Socials2.mp4",
        alt: "Social content",
      },
      {
        id: "social-3",
        video: "/social/Socials3.mp4",
        alt: "TikTok video",
      },
      {
        id: "social-4",
        video: "/social/Socials4.mp4",
        alt: "Instagram carousel",
      },
      {
        id: "social-5",
        video: "/social/Socials5.mp4",
        alt: "TikTok content",
      },
      {
        id: "social-6",
        video: "/social/Socials6.mp4",
        alt: "LinkedIn post",
      },
      {
        id: "social-7",
        video: "/social/Socials7.mp4",
        alt: "Instagram reel",
      },
      {
        id: "social-8",
        video: "/social/Socials8.mp4",
        alt: "Social reel",
      },
    ],
  },
  {
    id: "emails",
    label: "Emails",
    items: [
      { id: "email-1", video: "/email/video1.mp4", poster: "/placeholder.jpg", alt: "Email video 1" },
      { id: "email-2", video: "/email/video2.mp4", poster: "/placeholder.jpg", alt: "Email video 2" },
      { id: "email-3", video: "/email/video3.mp4", poster: "/placeholder.jpg", alt: "Email video 3" },
      { id: "email-4", video: "/email/video4.mp4", poster: "/placeholder.jpg", alt: "Email video 4" },
      { id: "email-5", video: "/email/video5.mp4", poster: "/placeholder.jpg", alt: "Email video 5" },
      { id: "email-6", video: "/email/video6.mp4", poster: "/placeholder.jpg", alt: "Email video 6" },
      { id: "email-7", video: "/email/video7.mp4", poster: "/placeholder.jpg", alt: "Email video 7" },
      { id: "email-8", video: "/email/video8.mp4", poster: "/placeholder.jpg", alt: "Email video 8" },
    ],
  },
]

export default function ImageCarousel() {
  const [activeCategory, setActiveCategory] = useState("emails")
  const [currentIndex, setCurrentIndex] = useState(0)
  const ROTATION_SPEED_S = 24 // Seconds per full revolution (slower, continuous)
  
  // Configuration constants
  // Base values; actual values will adapt to viewport
  const [itemWidth, setItemWidth] = useState(280)
  const [itemHeight, setItemHeight] = useState(340)
  const [visibleItems, setVisibleItems] = useState(8)
  const DEPTH = 400 // Perspective depth for the center/wrapper
  const RADIUS_SCALE = 1.5 // Widen the cylinder by scaling the computed radius

  const activeItems = categories.find((cat) => cat.id === activeCategory)?.items || []
  const itemCount = activeItems.length
  
  // Use the larger of the two counts to determine the number of slots
  const slots = Math.max(itemCount, visibleItems)

  // 1. Calculate the fixed angle step and cylinder radius
  const { angleStep, radius } = useMemo(() => {
    const calculatedAngleStep = 360 / slots
    
    // Calculate Radius (R) needed for items to touch edge-to-edge
    // R = (Item Width / 2) / tan(Angle / 2)
    const calculatedRadius = Math.round(
      ((itemWidth / 2) / Math.tan((Math.PI / 180) * (calculatedAngleStep / 2))) * RADIUS_SCALE
    )
    // If the count is low, we may need a larger radius to spread them out
    return { angleStep: calculatedAngleStep, radius: calculatedRadius }
  }, [slots, itemWidth])


  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  // Remove step-based rotation; use continuous CSS animation on wrapper instead

  // Responsive sizing based on viewport width
  useEffect(() => {
    const applyResponsiveSizes = () => {
      const w = window.innerWidth
      if (w < 640) {
        setItemWidth(160)
        setItemHeight(210)
        setVisibleItems(6)
      } else if (w < 768) {
        setItemWidth(180)
        setItemHeight(240)
        setVisibleItems(6)
      } else if (w < 1024) {
        setItemWidth(220)
        setItemHeight(280)
        setVisibleItems(7)
      } else {
        setItemWidth(280)
        setItemHeight(340)
        setVisibleItems(8)
      }
    }
    applyResponsiveSizes()
    window.addEventListener("resize", applyResponsiveSizes)
    return () => window.removeEventListener("resize", applyResponsiveSizes)
  }, [])

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

  const enterFullscreen = (video: HTMLVideoElement) => {
    try {
      const anyVideo = video as any
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (anyVideo.webkitEnterFullscreen) {
        anyVideo.webkitEnterFullscreen()
      } else if (anyVideo.msRequestFullscreen) {
        anyVideo.msRequestFullscreen()
      }
      video.play().catch(() => {})
    } catch (_) {}
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Display */}
        <div className="mb-12 sm:mb-16">
          <div
            className="h-[300px] sm:h-[450px] flex items-center justify-center"
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
                  className="absolute duration-2000 ease-in-out rounded-3xl overflow-hidden shadow-2xl border border-border/20"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`,
                    ...getFixedItemStyle(index),
                  }}
                >
                    {item.video ? (
                      <video
                        src={item.video}
                        poster={item.poster}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onClick={(e) => enterFullscreen(e.currentTarget)}
                      />
                    ) : (
                      <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
                    )}
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
                className={`pb-4 text-base sm:text-lg font-semibold transition-all relative shrink-0 ${
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
