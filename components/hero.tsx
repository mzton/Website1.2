"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Maximize, TrendingUp, Mail, MessageSquare, ArrowRight, Globe, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import LoginModal from "@/components/login-modal"
import Image from "next/image"


export default function Hero() {
  const fullText = "Speak Local. Sell Global."

  const [loginOpen, setLoginOpen] = useState(false)

  // Background media for the right-side visual (video with poster)
  const heroMedia = [
    { video: "/video/herovideo1.mp4", poster: "/placeholder.jpg" },
  ]
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroMedia.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Custom video controls state
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.6)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

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

  const onTime = () => {
    const v = videoRef.current
    if (!v) return
    setProgress(v.currentTime)
  }

  const onMeta = () => {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration || 0)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const skip = (delta: number) => {
    const v = videoRef.current
    if (!v) return
    const next = Math.max(0, Math.min(v.duration || Infinity, v.currentTime + delta))
    v.currentTime = next
    setProgress(next)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const updateStatus = () => setIsPlaying(!v.paused)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("loadedmetadata", onMeta)
    v.addEventListener("play", updateStatus)
    v.addEventListener("pause", updateStatus)
    // prime initial values
    onMeta()
    onTime()
    updateStatus()
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("loadedmetadata", onMeta)
      v.removeEventListener("play", updateStatus)
      v.removeEventListener("pause", updateStatus)
    }
  }, [bgIndex])

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
  const handleSeek = (val: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = val
    setProgress(val)
  }
  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00"
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }
  return (
    <section className="relative overflow-hidden px-4 pt-8 sm:pt-10 lg:pt-12 pb-12 sm:px-6 lg:px-8 scroll-mt-8 sm:scroll-mt-10 lg:scroll-mt-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="text-left flex flex-col"
          >
            <h1
              className="mb-4 font-black tracking-tighter text-foreground leading-tight text-balance text-[clamp(2.5rem,9vw,5.75rem)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="block">{fullText}</span>
            </h1>

            {/* CTA moved up below the headline */}
            <div className="flex flex-col gap-4 sm:flex-row items-start mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 text-lg font-semibold w-full sm:w-auto"
                onClick={() => setLoginOpen(true)}
              >
                Request Free Consultation
              </Button>
            </div>

            <p className="mb-8 text-base sm:text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl">
              Exceptional products. World-class technology. Outstanding service. Don't let the English language barrier become the glass ceiling between your business and international opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative block"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl group bg-background">
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
                    className={`object-contain object-center absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === bgIndex ? "opacity-100" : "opacity-0"}`}
                  />
                ) : (
                  <Image
                    key={(item as any).image}
                    src={(item as any).image}
                    alt="Hero background"
                    fill
                    priority={i === 0}
                    className={`object-contain object-center absolute inset-0 transition-opacity duration-1000 ${i === bgIndex ? "opacity-100" : "opacity-0"}`}
                  />
                )
              ))}
              {/* Custom controls overlay */}
              <div className="absolute bottom-0 inset-x-0 z-10 p-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <div className="bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl px-3 py-2 text-white">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={toggleMute} className="p-2 rounded bg-white/10 hover:bg-white/20" aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={volume}
                      onChange={(e) => handleVolume(parseFloat(e.target.value))}
                      className="w-24 h-1 rounded bg-white/20 accent-white"
                      aria-label="Volume"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 to-transparent"></div>
            </div>
            {/* Moved quote below the video */}
            <p className="mt-4 text-center mx-auto text-base sm:text-lg text-muted-foreground italic font-bold text-balance leading-relaxed max-w-2xl">
              "You're not alone. Thousands of Korean and Japanese companies face this exact moment every day."
            </p>
          </motion.div>
        </div>

      <div id="barrier" className="section bg-transparent py-10 px-4 mt-12 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Silent Barrier
          </h2>
          <p className="text-xl text-muted-foreground">Every day, opportunities pass by...</p>
        </div>

        {/* Visual problem scenarios */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Mail, title: "Unanswered Emails", color: "from-red-600 to-red-700" },
            { icon: MessageSquare, title: "Lost Conversations", color: "from-orange-600 to-orange-700" },
            { icon: TrendingUp, title: "Missed Deals", color: "from-amber-600 to-amber-700" }
          ].map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity rounded-2xl blur-xl" 
                   style={{ background: `linear-gradient(135deg, ${item.color})` }}></div>
              <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-border transition-all transform hover:scale-105 duration-300">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform`}>
                  <item.icon className="w-10 h-10 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground text-center mb-3">{item.title}</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-amber-500 mx-auto rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Emotional impact visualization */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-border/50">
            <p className="text-2xl text-muted-foreground mb-4">
              Language shouldn't limit greatness
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <ArrowRight className="w-6 h-6 text-primary" />
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-full h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Global Impact Section - Full Width */}
        <div className="mt-24 pt-16 border-t border-border/40">
          <div className="text-center">
            <p className="mb-12 text-sm font-semibold text-accent uppercase tracking-wide">Global Impact</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { stat: "180%", label: "Lead Growth", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
                { stat: "4", label: "New Partners", icon: Globe, color: "from-blue-500 to-cyan-600" },
                { stat: "3x", label: "Faster Sales", icon: CheckCircle, color: "from-purple-500 to-pink-600" },
              ].map((item) => (
                <motion.div key={item.stat} whileHover={{ scale: 1.05 }} className="text-center">
                  <div className={`mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
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
