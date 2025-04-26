"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { ChatWindow } from "./chat-window"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isOpen && <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>}

      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}
