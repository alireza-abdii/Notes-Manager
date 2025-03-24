import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => changeLanguage(language === 'en' ? 'fa' : 'en')}
      className="btn flex items-center gap-2 bg-amber-200 text-amber-900 hover:bg-amber-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
      aria-label={t('settings.language')}
    >
      <span className="text-lg">{language === 'en' ? '🇮🇷' : '🇺🇸'}</span>
      <span className="hidden sm:inline">{language === 'en' ? 'فارسی' : 'English'}</span>
    </button>
  );
}
