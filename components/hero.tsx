"use client"

import { useEffect, useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import LoginModal from "@/components/login-modal"

export default function Hero() {
  const fullText = "Your Company Needs More Than Visibility. It Needs a Voice."

  // Background media for the right-side visual (now using video)
  const heroMedia = [
    { video: "/video/Hero.mp4", poster: "/filipino-professionals-having-video-conference-wit.jpg" },
  ]
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroMedia.length)
    }, 5000) // change background every 5s
    return () => clearInterval(interval)
  }, [])

  const [loginOpen, setLoginOpen] = useState(false)
  // Custom video controls state
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.6)
  

  // Attach the ref to the currently visible video when background index changes
  useEffect(() => {
    const active = document.querySelector<HTMLVideoElement>("video.opacity-100")
    if (active) {
      videoRef.current = active
      active.muted = isMuted
      active.volume = volume
    }
  }, [bgIndex])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // keep properties in sync
    v.muted = isMuted
    v.volume = volume
  }, [isMuted, volume])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }
  const handleVolume = (val: number) => {
    const v = videoRef.current
    if (!v) return
    v.volume = val
    setVolume(val)
    if (val > 0) {
      v.muted = false
      setIsMuted(false)
    }
  }
  
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-left flex flex-col justify-center h-64 sm:h-80 md:h-96"
          >
            <h1
              className="mb-6 font-black tracking-tighter text-foreground leading-tight text-balance text-[clamp(2rem,6vw,3.5rem)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="block">{fullText}</span>
            </h1>

            <p className="mb-8 text-base sm:text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl">
              For Korean and Japanese companies aiming for the world stage, we provide a dedicated, English-proficient
              team in the Philippines to act as your Global Department.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row items-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 text-lg font-semibold w-full sm:w-auto"
                onClick={() => setLoginOpen(true)}
              >
                Request Free Consultation
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative block"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              {heroMedia.map((item, i) => (
                item.video ? (
                  <video
                    key={item.video}
                    src={item.video}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={(e) => {
                      const v = e.currentTarget
                      // Ensure autoplay proceeds when ready
                      v.play().catch(() => {})
                    }}
                    // Custom controls overlay; hide native controls
                    ref={i === bgIndex ? videoRef : undefined}
                    className={`object-cover absolute -inset-px w-full h-full transition-opacity duration-1000 ${i === bgIndex ? "opacity-100" : "opacity-0"}`}
                  />
                ) : (
                  <Image
                    key={(item as any).image}
                    src={(item as any).image}
                    alt="Hero background"
                    fill
                    priority={i === 0}
                    className={`object-cover absolute -inset-px transition-opacity duration-1000 ${i === bgIndex ? "opacity-100" : "opacity-0"}`}
                  />
                )
              ))}
              {/* Custom controls overlay */}
              <div className="absolute bottom-0 inset-x-0 z-10 p-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <div className="bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl px-3 py-2 text-white">
                  <div className="flex items-center justify-end gap-2 max-w-full">
                    {/* Volume button only */}
                    <button onClick={toggleMute} className="p-2 rounded bg-white/10 hover:bg-white/20" aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Global Impact Section - Full Width */}
        <div className="mt-24 pt-16 border-t border-border/40">
          <div className="text-center">
            <p className="mb-12 text-sm font-semibold text-accent uppercase tracking-wide">Global Impact</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { stat: "180%", label: "Lead Growth" },
                { stat: "4", label: "New Partners" },
                { stat: "3x", label: "Faster Sales" },
              ].map((item) => (
                <motion.div key={item.stat} whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-primary mb-3">{item.stat}</div>
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </section>
  )
}
