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
        className="fixed bottom-6 right-6 text-white p-3 transition-all z-50"
        aria-label="Open chat"
      >
        {/* <MessageCircle size={24} /> */}
        <img src="../images/chatBotLogo.jpeg" alt="Chat Icon" className="w-10 h-10" />
      </button>}

      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}
