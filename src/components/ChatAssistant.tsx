// src/components/ChatAssistant.tsx

import { useState } from 'react'
import { Bot, SendIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CustomLink from './CustomLink'



function ChatAssistant() {
  const [message, setMessage] = useState('')
  const [robotMessage, setRobotMessage] = useState(
    "**Have Questions?** 🤔\n\nI'm Ilyas's AI assistant 🤖. Chat with me to discover how we can add value to your projects.\n\n++\n\n***PS:** Some prompts to get you started are on top of the chat box.*"
  );
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAssistantActive, setIsAssistantActive] = useState(false)

  const promptExamples = [
    "What's your favorite project?",
    'Can you describe your experience?',
    'What are your skills?',
    'Tell me about your projects.',
    'How can I contact you?',
  ];
  

  // Handle form submission
  const handleSubmit = (e?: React.FormEvent, userMessage?: string) => {
    if (e && e.preventDefault) e.preventDefault()

    const messageToSend = userMessage ?? message

    if (messageToSend.trim() && !isStreaming) {
      setIsAssistantActive(true)
      setIsStreaming(true)
      setRobotMessage('')
       // Start loading animation
      setIsLoading(true)

      const apiKey = import.meta.env.VITE_API_KEY;

      const dev = import.meta.env.VITE_DEV_MODE;
      let url = import.meta.env.VITE_API_URL;
      if (dev === 'true') {
        url = 'http://localhost:8000';
      }
      
      const fetchData = async () => {
        try {
          const response = await fetch(url+'/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              
            },
            body: JSON.stringify({
              query: messageToSend,
              stream: true,
              messages: [], // Empty messages as we're not maintaining history
            }),
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

         

          const reader = response.body?.getReader()
          const decoder = new TextDecoder('utf-8')
          let done = false
          let assistantMessage = ''
          let isFirstChunk = true

          while (!done) {
            const { value, done: doneReading } = await reader!.read()
            done = doneReading
            if (value) {
              const chunk = decoder.decode(value)
              assistantMessage += chunk
              setRobotMessage(assistantMessage)

              if (isFirstChunk) {
                // Stop loading animation
                setIsLoading(false)
                isFirstChunk = false
              }
            }
          }

          setIsStreaming(false)
        } catch (error: any) {
          console.error('Error:', error)
          setIsStreaming(false)
          setIsLoading(false)
          setRobotMessage('Error: ' + error.message)
        } finally {
          setIsAssistantActive(false)
        }
      }

      fetchData()
    }
  }

  // Handle clearing the input
  const handleClear = () => {
    setMessage('')
  }

  // Handle prompt example clicks
  const handlePromptClick = (prompt: string) => {
   
    setMessage(prompt) // Update the input box

    // Delay the submission slightly to ensure the input box updates
    setTimeout(() => {
      handleSubmit(undefined, prompt)
    }, 100)
    
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Prompt Examples */}
      <div className="flex flex-wrap gap-2 mb-4">
        {promptExamples.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="text-sm bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full px-3 py-1 hover:bg-blue-500/30 transition-colors duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center space-x-2 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 rounded-full p-2 border border-gray-200 dark:border-gray-700/50 transition-all duration-300 focus-within:border-blue-500/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.7)] focus:border-blue-500">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isStreaming}
            className="flex-1 bg-transparent border-none text-lg tracking-wider text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 focus:outline-none px-4 py-3"
            style={{ boxShadow: 'none', outline: 'none' }}
          />
          {message && !isStreaming && (
            <Button
              type="button"
              size="icon"
              onClick={handleClear}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-all duration-300"
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

      {/* Assistant Response */}
      <div className="flex items-start space-x-4">
        <div className="flex-grow overflow-hidden">
          {/* Chat Bubble with fade-in and fade-out effect */}
          <div
            className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-900 dark:text-gray-100 rounded-2xl py-3 px-4 max-w-full shadow-lg border border-gray-200 dark:border-gray-700/50 transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`} // Fades out when loading, fades in when the first chunk arrives
            style={{ minHeight: '100px' }} // Fixed height to prevent shifting
          >
            {/* Assistant Response */}
            <div className="text-base tracking-wide break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => <CustomLink {...props} />, // Override link rendering
                }}
              >
                {robotMessage}
              </ReactMarkdown>
              {isStreaming && <span className="animate-pulse">|</span>}
            </div>
          </div>
        </div>

        {/* Bot Icon and Loading Animation */}
        <div className="flex items-center space-x-2 ">
          {/* Loading Animation */}
          {isLoading && (
            <div className="flex justify-center items-center mr-4 ">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Bot Icon */}
          <div
            className={`w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-blue-500/10 shadow-lg transition-all duration-150 ${
              isAssistantActive
                ? 'scale-110 border-blue-400/50 shadow-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.7)]'
                : ''
            }`}
          >
            <Bot
              className={`w-6 h-6 text-blue-300 transition-all duration-150 ${
                isAssistantActive ? 'scale-110' : ''
              }`}
            />
          </div>
        </div>
      </div>


    </div>
  )
}

export default ChatAssistant
