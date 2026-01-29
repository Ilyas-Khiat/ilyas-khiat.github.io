import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Tag,
  FileText,
  Leaf,
  Users,
  Activity,
  Lock,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import theo_image from '@/assets/theo.png';
import carbone_image from '@/assets/carbone.png';
import carto_image from '@/assets/carto.png';
import tumor_image from '@/assets/tumor.jpeg';

interface Project {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
  link: string;
  illustration: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'THEO Pratik - AI Document Analysis and Knowledge Graph Application',
    description:
      'An AI application to analyze documents and generate knowledge graphs, facilitating quicker understanding of complex reports, images, and other documents. Implemented traditional RAG and Knowledge Graph techniques.',
    keywords: [
      'RAG',
      'Knowledge Graphs',
      'Document Analysis',
      'AI/ML',
      'LangChain',
      'OpenAI APIs',
      'HuggingFace',
    ],
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    link: 'https://huggingface.co/spaces/bziiit/AGENT_ANALYSE_RAG?logs=container',
    illustration: theo_image,
  },
  {
    id: 2,
    title: 'AI Carbon Footprint Application',
    description:
      'An application to calculate the carbon footprint of AI processes using AFNOR SPEC IA Frugale standards, directly linked to OpenData Bordeaux. Adapted the EcoloGit library to measure the carbon impact of LLM queries and integrated it with the RAG system.',
    keywords: [
      'API Integration',
      'Sustainable AI',
      'RAG',
      'Data Analysis',
      'LangChain',
      'EcoloGit',
      'Python',
    ],
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    link: 'https://huggingface.co/spaces/bziiit/OpenData-Bordeaux-IA-RSE?logs=container',
    illustration: carbone_image,
  },
  {
    id: 3,
    title: 'OpenData Bordeaux RSE Application',
    description:
      'Built an application to extract and analyze stakeholders from public web data, using AI for stakeholder mapping in CSR contexts.',
    keywords: [
      'Web Data Extraction',
      'Stakeholder Mapping',
      'AI/ML',
      'LangChain',
      'HuggingFace',
      'Python',
    ],
    icon: <Users className="w-8 h-8 text-purple-500" />,
    link: 'https://huggingface.co/spaces/bziiit/OpenData-Bordeaux-IA-RSE?logs=container',
    illustration: carto_image,
  },
  // {
  //   id: 4,
  //   title: 'IA Vegetalis - Marketing Content Generator for Agricultural Event (Internship bziiit)',
  //   description:
  //     "Developed a marketing content generation agent for an agricultural event ('Salon d'Agriculture'). The agent uses hybrid RAG techniques combining public event data and private company data to generate personalized marketing content.",
  //   keywords: [
  //     'RAG',
  //     'AI/ML',
  //     'Event-specific AI',
  //     'Content Generation',
  //     'LangChain',
  //     'FastAPI',
  //     'Vector Databases',
  //   ],
  //   icon: <Globe className="w-8 h-8 text-yellow-500" />,
  //   link: 'https://bziiit-vegetalis-ai-api.hf.space/docs',
  //   illustration: 'https://placeholder.pics/svg/300x200',
  // },
  {
    id: 5,
    title: 'Brain Tumor Detection Using CNN',
    description:
      'Built a CNN-based Python application for detecting brain tumors from MRI images. Started with basic NumPy implementations, evolving to a more complex TensorFlow architecture.',
    keywords: [
      'Deep Learning',
      'CNN',
      'Medical Image Processing',
      'TensorFlow',
      'NumPy',
      'Python',
    ],
    icon: <Activity className="w-8 h-8 text-red-500" />,
    link: 'https://github.com/Ilyas-Khiat/Tumor-Detection-in-MRI-Images-using-CNN',
    illustration: tumor_image,
  },
  {
    id: 6,
    title: 'Steganography Application',
    description:
      'Developed an application to hide messages in images using steganography techniques. Integrated image processing tools and developed a GUI.',
    keywords: [
      'Image Processing',
      'Steganography',
      'GUI Development',
      'Python',
      'OpenCV',
      'QT',
    ],
    icon: <Lock className="w-8 h-8 text-indigo-500" />,
    link: 'https://github.com/Ilyas-Khiat/stegano-app',
    illustration: 'https://raw.githubusercontent.com/Ilyas-Khiat/stegano-app/refs/heads/main/readme_img/home.PNG',
  },
  {
    id: 7,
    title: 'Pathfinding and Sorting Visualizer',
    description:
      "Created a visualization tool for pathfinding and sorting algorithms. Implemented popular algorithms such as A* and Merge Sort, visualized through Python's Pygame.",
    keywords: [
      'Algorithm Visualization',
      'Pathfinding',
      'Sorting Algorithms',
      'Python',
      'Pygame',
    ],
    icon: <Map className="w-8 h-8 text-orange-500" />,
    link: 'https://github.com/Ilyas-Khiat/python-pathfinder-GUI',
    illustration: 'https://github.com/Ilyas-Khiat/python-pathfinder-GUI/blob/main/readme_imgs/main.PNG?raw=true',
  },
];

export default function ProjectList() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          className="flex flex-col h-full"
        >
          <Card className="flex-1 backdrop-blur-md bg-white/10 dark:bg-gray-800/10 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <motion.div
                animate={{
                  scale: hoveredProject === project.id ? 1.1 : 1,
                  rotate: hoveredProject === project.id ? 5 : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {project.icon}
              </motion.div>
              <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video mb-4 overflow-hidden rounded-md">
                <img
                  src={project.illustration}
                  alt={`Illustration for ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-300"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
