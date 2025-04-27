"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasStarted = useRef(false);

  console.group(messages)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initiateChat = async (msg: string, session: string | null) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://schema-registry-dev.azurewebsites.net/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            Connection: "keep-alive",
            Origin: "https://schema-registry-dev.azurewebsites.net",
            Referer: "https://schema-registry-dev.azurewebsites.net/",
          },
          body: JSON.stringify({
            message: msg,
            session_id: session,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: uuidv4(),
        content:
          data.message ||
          "I received your message. How can I help you further?",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setSessionId(data.session_id);
    } catch (error) {
      console.error("Error during chat initiation:", error);

      const errorMessage: Message = {
        id: uuidv4(),
        content:
          "Sorry, there was an error processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setSessionId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    await initiateChat(currentInput, sessionId);
  };

  // Initial Chat
  useEffect(() => {
    if (!hasStarted.current) {
      initiateChat("", null);
      hasStarted.current = true;
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-6 w-[23.5rem] h-[400px] bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-podsBlue text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-16 relative">
            <Image
              src="/images/pods-logo2.png"
              alt="PODS Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <span className="font-medium">ChatPODS</span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-podsBlue text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-line text-xs">
                {message.content}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
                style={{ fontSize: "10px" }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg text-gray-800 rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 border-t border-gray-200 flex"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 text-xs p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-podsBlue"
        />
        <button
          type="submit"
          className="bg-podsBlue text-white p-2 rounded-r-md hover:bg-podsBlue-light"
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
