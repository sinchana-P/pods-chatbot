import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { QuoteForm } from "@/components/quote-form"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative">
        <HeroSection />
        <div className="absolute top-0 right-0 w-full md:w-1/3 p-4 md:p-8 z-10">
          <QuoteForm />
        </div>
      </div>
      <ChatbotButton />
    </main>
  )
}
