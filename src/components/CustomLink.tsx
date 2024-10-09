// CustomLink.tsx

import React from 'react'
import { ExternalLinkIcon } from 'lucide-react'

interface CustomLinkProps {
  href?: string
  title?: string
  children: React.ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, title, children }) => {
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold underline"
    >
      {children}
      <ExternalLinkIcon className="ml-1 w-4 h-4" />
    </a>
  )
}

export default CustomLink
