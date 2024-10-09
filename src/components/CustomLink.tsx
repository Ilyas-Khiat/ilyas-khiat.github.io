// CustomLink.tsx

import React from 'react'
import { ExternalLinkIcon } from 'lucide-react'

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold underline"
        {...props}
      >
        {children}
        <ExternalLinkIcon className="ml-1 w-4 h-4" />
      </a>
    )
  }
)

CustomLink.displayName = 'CustomLink'

export default CustomLink
