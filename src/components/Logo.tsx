// src/components/Logo.tsx

import { useTranslation } from 'react-i18next';

interface LogoProps {
  isDarkMode: boolean;
}

function Logo({ isDarkMode }: LogoProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('logo.name')}
      </div>
      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {t('logo.title')}
      </div>
    </div>
  );
}

export default Logo;

