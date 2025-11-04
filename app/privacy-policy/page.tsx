import PrivacyContent from "@/components/legal/privacy-content"

export default function PrivacyPolicyPage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>
        <PrivacyContent />
      </div>
    </main>
  )
}