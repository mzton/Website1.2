"use client"

import { Facebook, Instagram } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TermsContent from "@/components/legal/terms-content"
import PrivacyContent from "@/components/legal/privacy-content"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 mb-12">
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="font-sans transition hover:text-accent">
                      Terms of Service
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Terms of Service</DialogTitle>
                    </DialogHeader>
                    <TermsContent />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="font-sans transition hover:text-accent">
                      Privacy Policy
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <PrivacyContent />
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-muted-foreground transition hover:text-accent"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-muted-foreground transition hover:text-accent"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center notranslate" translate="no">
            <span className="font-semibold text-foreground" translate="no">BOOSTK</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right notranslate" translate="no">
            © 2025 BOOSTK. Connecting Asian Innovation with Global Markets.
          </p>
        </div>
      </div>
    </footer>
  )
}
