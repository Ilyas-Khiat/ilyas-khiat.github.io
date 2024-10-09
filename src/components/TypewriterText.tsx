// src/components/TypewriterText.tsx

interface TypewriterTextProps {
  text: string
}

function TypewriterText({ text }: TypewriterTextProps) {
//   const [displayText, setDisplayText] = useState('')
//   // const index = useRef(0)

// //   useEffect(() => {
// //     const typingInterval = setInterval(() => {
// //       if (index.current < text.length) {
// //         setDisplayText((prev) => prev + text.charAt(index.current))
// //         index.current += 1
// //       } else {
// //         clearInterval(typingInterval)
// //       }
// //     }, 100)

// //     return () => clearInterval(typingInterval)
// //   }, [text])

  return <span>{text}</span>
}

export default TypewriterText
