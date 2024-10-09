'use client'

import { useState, useEffect } from 'react'
import { Bot, SendIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChatInputWithoutOutline() {
  const [message, setMessage] = useState('')
  const [robotMessage, setRobotMessage] = useState("Hello! I'm your AI assistant. How can I help you today?")
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamIndex, setStreamIndex] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isStreaming) {
      setIsStreaming(true)
      setStreamIndex(0)
      setRobotMessage('')
    }
  }

  const handleClear = () => {
    setMessage('')
  }

  useEffect(() => {
    if (isStreaming && streamIndex < message.length) {
      const timer = setTimeout(() => {
        setRobotMessage(prev => prev + message[streamIndex])
        setStreamIndex(prev => prev + 1)
      }, 50)

      return () => clearTimeout(timer)
    } else if (isStreaming && streamIndex === message.length) {
      setIsStreaming(false)
    }
  }, [isStreaming, message, streamIndex])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md mx-auto space-y-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center space-x-2 backdrop-blur-md bg-gray-800/50 rounded-full p-2 border border-gray-700/50">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none text-gray-100 placeholder-gray-400 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {message && (
              <Button 
                type="button" 
                size="icon"
                onClick={handleClear}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-all duration-300"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Clear message</span>
              </Button>
            )}
            <Button 
              type="submit" 
              size="icon"
              disabled={isStreaming}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 disabled:opacity-50"
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>

        <div className="flex items-start space-x-4 flex-row-reverse">
          <div className="flex-shrink-0 ml-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-blue-500/10 shadow-lg">
              <Bot className="w-6 h-6 text-blue-300" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="bg-gray-800/50 backdrop-blur-md text-gray-100 rounded-2xl py-3 px-4 max-w-[80%] shadow-lg border border-gray-700/50 animate-fade-in-up ml-auto">
              <p className="text-sm">
                {robotMessage}
                {isStreaming && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
`;