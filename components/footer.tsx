import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  English Communication
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Social Media & Content
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Sales Development
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Global Strategy
                </a>
              </li>
            </ul>
          </div>
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
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Client Results
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="font-sans text-muted-foreground transition hover:text-accent" title="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="font-sans text-muted-foreground transition hover:text-accent" title="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="text-xs font-bold text-primary-foreground">BK</span>
            </div>
            <span className="font-semibold text-foreground">BOOSTK</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © 2025 BOOSTK. Connecting Asian Innovation with Global Markets.
          </p>
        </div>
      </div>
    </footer>
  )
}
