"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import LoginModal from "@/components/login-modal"

export default function Hero() {
  const fullText = "Your Product Needs More Than Visibility. It Needs a Voice."

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
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.6)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState(1)

  // Attach the ref to the currently visible video when background index changes
  useEffect(() => {
    const active = document.querySelector<HTMLVideoElement>("video.opacity-100")
    if (active) {
      videoRef.current = active
      active.muted = isMuted
      active.volume = volume
      active.playbackRate = rate
    }
  }, [bgIndex])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setProgress(v.currentTime)
    const onMeta = () => setDuration(v.duration || 0)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("loadedmetadata", onMeta)
    // keep properties in sync
    v.muted = isMuted
    v.volume = volume
    v.playbackRate = rate
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("loadedmetadata", onMeta)
    }
  }, [isMuted, volume, rate])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }
  const skip = (delta: number) => {
    const v = videoRef.current
    if (!v) return
    const next = Math.max(0, Math.min((v.duration || 0), v.currentTime + delta))
    v.currentTime = next
    setProgress(next)
  }
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
  const changeRate = (val: number) => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = val
    setRate(val)
  }
  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00"
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
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
                  <div className="flex flex-wrap items-center gap-3 max-w-full">
                    {/* Left cluster: play/pause and skip */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={togglePlay} className="p-2 rounded bg-white/10 hover:bg-white/20" aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button onClick={() => skip(-10)} className="p-2 rounded bg-white/10 hover:bg-white/20" aria-label="Skip back 10 seconds">
                        <SkipBack className="w-4 h-4" />
                      </button>
                      <button onClick={() => skip(10)} className="p-2 rounded bg-white/10 hover:bg-white/20" aria-label="Skip forward 10 seconds">
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Center: seek bar with time (takes remaining space) */}
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={progress}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="w-full min-w-0 h-1 rounded bg-white/20 accent-white"
                        aria-label="Seek"
                      />
                      <div className="text-xs whitespace-nowrap">
                        {fmt(progress)} / {fmt(duration)}
                      </div>
                    </div>

                    {/* Right cluster: volume and speed chips */}
                    <div className="flex items-center gap-2 flex-shrink-0">
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
