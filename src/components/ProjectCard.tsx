// src/components/ProjectCard.tsx
import React from 'react'

interface ProjectCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ProjectCard({ title, description, icon }: ProjectCardProps) {
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg p-6 border border-white/20 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-2 text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  )
}

export default ProjectCard
