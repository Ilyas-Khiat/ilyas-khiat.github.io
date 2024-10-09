// src/components/AboutMeSection.tsx

import { motion } from 'framer-motion'
import { FileText, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const socialLinks = [
  { name: 'GitHub', icon: <Github className="w-6 h-6" />, url: 'https://github.com/ilyas-khiat' },
  { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, url: 'https://linkedin.com/in/ilyaskhiat' },
  // Add or remove links as needed
]

export default function AboutMeSection() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0  rounded-3xl -z-10"></div>

      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">About Me</CardTitle>
              <CardDescription>
                AI - SOFTWARE ENGINEER | Tech Enthusiast | Lifelong Learner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                I'm Ilyas Khiat, an AI software engineer with a keen interest in building
                innovative and user-centric web applications. With a strong foundation in modern
                technologies, I strive to create efficient, scalable, and elegant solutions to
                complex problems.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                
                >
                  <FileText className="w-4 h-4" />
                  <span>Download CV</span>
                </Button>
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'MERN stack',
                    'Python',
                    'Java',
                    'C/C++',
                    'Tensorflow',
                    'Docker',
                    'FASTAPI',
                    'GIT'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
