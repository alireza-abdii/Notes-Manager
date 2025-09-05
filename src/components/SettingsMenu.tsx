import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui';
import { useClickOutside, useToggle } from '../hooks';

export function SettingsMenu() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { value: isOpen, toggle: toggleOpen, setFalse: closeMenu } = useToggle(false);
  const menuRef = useClickOutside<HTMLDivElement>(closeMenu);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={toggleOpen}
        className="flex items-center gap-2 bg-amber-200 text-amber-900 hover:bg-amber-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        aria-label={t('settings.title')}
      >
        <span className="text-lg">⚙️</span>
        <span className="hidden sm:inline">{t('settings.title')}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute end-0 z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            <div className="p-4">
              <h3 className="mb-2 text-lg font-medium text-amber-900 dark:text-slate-100">
                {t('settings.title')}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-amber-900 dark:text-slate-100">
                    {t('settings.theme')}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (theme === 'dark') toggleTheme();
                        closeMenu();
                      }}
                      className={`flex-1 text-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
                        theme === 'light'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t('theme.light')}
                    </button>
                    <button
                      onClick={() => {
                        if (theme === 'light') toggleTheme();
                        closeMenu();
                      }}
                      className={`flex-1 text-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-600 text-slate-100'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t('theme.dark')}
                    </button>
                  </div>
                </div>

                {/* Language Setting */}
                <div>
                  <p className="mb-2 text-sm font-medium text-amber-900 dark:text-slate-100">
                    {t('settings.language')}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (language !== 'en') changeLanguage('en');
                        closeMenu();
                      }}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                        language === 'en'
                          ? 'bg-amber-200 text-amber-900 dark:bg-slate-600 dark:text-slate-100'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>🇺🇸</span> English
                    </button>
                    <button
                      onClick={() => {
                        if (language !== 'fa') changeLanguage('fa');
                        closeMenu();
                      }}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                        language === 'fa'
                          ? 'bg-amber-200 text-amber-900 dark:bg-slate-600 dark:text-slate-100'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>🇮🇷</span> فارسی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
