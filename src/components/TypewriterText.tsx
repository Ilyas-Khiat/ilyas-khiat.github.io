// src/components/TypewriterText.tsx
import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  text: string
}

function TypewriterText({ text }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const index = useRef(0)

//   useEffect(() => {
//     const typingInterval = setInterval(() => {
//       if (index.current < text.length) {
//         setDisplayText((prev) => prev + text.charAt(index.current))
//         index.current += 1
//       } else {
//         clearInterval(typingInterval)
//       }
//     }, 100)

//     return () => clearInterval(typingInterval)
//   }, [text])

  return <span>{displayText}</span>
}

export default TypewriterText
