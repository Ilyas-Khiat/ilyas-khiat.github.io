// src/components/Navbar.tsx
import { useState, useRef, useEffect } from 'react';
import {
  Home,
  FolderKanban,
  Terminal,
  Compass,
  Menu,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToHome: () => void;
  scrollToProjects: () => void;
  scrollToContact: () => void;
}

function Navbar({
  isDarkMode,
  toggleDarkMode,
  scrollToHome,
  scrollToProjects,
  scrollToContact,
}: NavbarProps) {
  const [activeButton, setActiveButton] = useState<string | null>('home');
  const { t, i18n } = useTranslation();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    switch (buttonId) {
      case 'home':
        scrollToHome();
        break;
      case 'projects':
        scrollToProjects();
        break;
      case 'contact':
        scrollToContact();
        break;
      default:
        break;
    }
  };

  // Language switcher handler
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Map language codes to display names
  const languageNames: { [key: string]: string } = {
    en: 'English',
    fr: 'Français',
    // Add more languages as needed
  };

  // Get the current language code
  const currentLanguageCode = i18n.language || 'en';
  const currentLanguage = languageNames[currentLanguageCode] || 'English';

  const NavButton = ({
    id,
    name,
    icon,
  }: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
        activeButton === id
          ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 shadow-md'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/50'
      }`}
      onClick={() => handleButtonClick(id)}
    >
      {icon}
      <span className="ml-2">{name}</span>
    </Button>
  );

  return (
    <nav className="max-w-6xl mx-auto backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-between items-center">
        <Logo isDarkMode={isDarkMode} />
        <ul className="flex items-center space-x-1">
          {/* Mobile Menu */}
          <li className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-full transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 bg-white dark:bg-gray-800 backdrop-blur-md border-gray-200 dark:border-gray-700"
              >
                <nav className="flex flex-col space-y-2 mt-4">
                  <NavButton
                    id="home"
                    name={t('home')}
                    icon={<Home className="h-5 w-5" />}
                  />
                  <NavButton
                    id="projects"
                    name={t('projects')}
                    icon={<FolderKanban className="h-5 w-5" />}
                  />
                  <NavButton
                    id="contact"
                    name={t('contact')}
                    icon={<Compass className="h-5 w-5" />}
                  />
                </nav>
              </SheetContent>
            </Sheet>
          </li>

          {/* Desktop Menu */}
          <li className="hidden sm:flex space-x-1">
            <NavButton
              id="home"
              name={t('home')}
              icon={<Home className="h-5 w-5" />}
            />
            <NavButton
              id="projects"
              name={t('projects')}
              icon={<FolderKanban className="h-5 w-5" />}
            />
            <NavButton
              id="contact"
              name={t('contact')}
              icon={<Compass className="h-5 w-5" />}
            />
          </li>

          {/* Theme Toggle */}
          <li>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-full transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
              <span className="sr-only">{t('toggleTheme')}</span>
            </Button>
          </li>

          {/* Language Selector */}
          <li className="relative flex items-center" ref={languageMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguageMenuOpen(!isLanguageMenuOpen)}
              className="ml-2 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-full transition-all duration-300"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">{currentLanguage}</span>
              <span className="sr-only">{t('changeLanguage')}</span>
            </Button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                {Object.keys(languageNames).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      currentLanguageCode === lng
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300'
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    {languageNames[lng]}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
