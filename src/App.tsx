// src/App.tsx

import { useState, useEffect , useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import BackgroundShapes from './components/BackgroundShapes';
import ChatAssistant from './components/ChatAssistant';

import Contact from './components/Contact';
import Footer from './components/Footer';
import { Button } from '@/components/ui/button';

import ProjectList from './components/ProjectList';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation();

  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors duration-300`}
    >
      <BackgroundShapes isDarkMode={isDarkMode} />
      <div className="relative z-10">
        {/* Navbar */}
        <header className="w-full p-4 fixed top-0 left-0 right-0 z-20">
          <Navbar isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            scrollToHome={scrollToHome}
            scrollToProjects={scrollToProjects}
            scrollToContact={scrollToContact} 
          />
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="h-10 sm:hidden"></div>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                {t('hero.title1')}
              </h1>
              {/* <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                {t('hero.title2')}
              </h1> */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex space-x-4">
                <Button onClick={scrollToProjects} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                  {t('hero.buttons.exploreProjects')}
                </Button>
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
                >
                  {t('hero.buttons.getInTouch')}
                </Button>
              </div>
            </div>
            <div>
              <ChatAssistant />
            </div>
          </div>
        </section>

        {/* Spacer Between Sections */}
        <div className="h-10"></div>

        {/* Featured Projects Section */}
        {/* <section className="min-h-screen flex flex-col justify-center">
          <div className="container mx-auto px-4 space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {t('projects.sectionTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ProjectCard
                title={t('projects.cards.card1.title')}
                description={t('projects.cards.card1.description')}
                icon={<Globe className="w-6 h-6 text-blue-500" />}
              />
              <ProjectCard
                title={t('projects.cards.card2.title')}
                description={t('projects.cards.card2.description')}
                icon={<Bot className="w-6 h-6 text-purple-500" />}
              />
              <ProjectCard
                title={t('projects.cards.card3.title')}
                description={t('projects.cards.card3.description')}
                icon={<Zap className="w-6 h-6 text-green-500" />}
              />
            </div>
          </div>
        </section> */}

        {/* {PROJECT LIST} */}
        <section ref={projectsRef} className="min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {t('exploreProjects')}
            </h2>
            <ProjectList/>
          </div>
        </section>

        {/* Spacer Between Sections */}
        <div className="h-32"></div>

        {/* Contact Section */}
        <section ref={contactRef} className="min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <Contact />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
