import TermsContent from "@/components/legal/terms-content"

export default function TermsOfServicePage() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Terms of Service</h1>
        <TermsContent />
      </div>
    </main>
  )
}