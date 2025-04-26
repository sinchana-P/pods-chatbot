import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="h-8 w-24 relative">
              <Image src="/images/pods-logo2.png" alt="PODS Logo" fill style={{ objectFit: "contain" }} priority />
            </div>
          </Link>
          <nav className="hidden md:flex ml-8 space-x-6">
            <Link href="#" className="text-gray-700 hover:text-red-600 font-medium">
              Moving
            </Link>
            <Link href="#" className="text-gray-700 hover:text-red-600 font-medium">
              Storage
            </Link>
            <Link href="#" className="text-gray-700 hover:text-red-600 font-medium">
              Locations
            </Link>
            <Link href="#" className="text-gray-700 hover:text-red-600 font-medium">
              For business
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-podsBlue hover:bg-podsBlue-light" style={{ width: '180px' }}>Log in</Button>
          <span className="hidden md:inline text-gray-700">(855) 706-4758</span>
        </div>
      </div>
    </header>
  )
}
