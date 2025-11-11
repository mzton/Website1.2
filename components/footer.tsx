"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TermsContent from "@/components/legal/terms-content"
import PrivacyContent from "@/components/legal/privacy-content"

type FooterProps = { language?: "English" | "Korean" }
export default function Footer({ language = "English" }: FooterProps) {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm md:backdrop-blur px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 justify-items-center text-center">
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">{language === "Korean" ? "회사" : "Company"}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  {language === "Korean" ? "회사 소개" : "About Us"}
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  {language === "Korean" ? "팀" : "Our Team"}
                </a>
              </li>
              <li>
                <a href="#" className="font-sans transition hover:text-accent">
                  {language === "Korean" ? "채용" : "Careers"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">{language === "Korean" ? "법률" : "Legal"}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="font-sans transition hover:text-accent">
                      {language === "Korean" ? "이용 약관" : "Terms of Service"}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{language === "Korean" ? "이용 약관" : "Terms of Service"}</DialogTitle>
                    </DialogHeader>
                    <TermsContent />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="font-sans transition hover:text-accent">
                      {language === "Korean" ? "개인정보 처리방침" : "Privacy Policy"}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{language === "Korean" ? "개인정보 처리방침" : "Privacy Policy"}</DialogTitle>
                    </DialogHeader>
                    <PrivacyContent />
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center notranslate" translate="no">
            <span className="font-semibold text-foreground" translate="no">BOOSTK</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right notranslate" translate="no">
            © 2025 BOOSTK. {language === "Korean" ? "아시아 혁신을 글로벌 시장과 연결합니다." : "Connecting Asian Innovation with Global Markets."}
          </p>
        </div>
      </div>
    </footer>
  )
}
