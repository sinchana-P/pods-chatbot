import Image from "next/image"

export function HeroSection() {
  return (
    <div className="relative h-[600px] w-full">
      <Image src="/images/hero-background2.jpg" alt="PODS truck on road" fill style={{ objectFit: "cover" }} priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Make your next move your easiest one yet.</h1>
            <p className="text-xl mb-6">Take the stress out of moving with PODS' flexible container rentals.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
