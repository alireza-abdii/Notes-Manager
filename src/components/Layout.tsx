import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { SettingsMenu } from './SettingsMenu';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div
      className={`min-h-screen bg-amber-50 text-amber-900 dark:bg-slate-900 dark:text-slate-100 ${isRTL ? 'font-vazir' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <header className="sticky top-0 z-10 w-full bg-amber-100 shadow-sm dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-900 dark:text-slate-100">
              {t('notes.title')}
            </h1>
            <div className="relative">
              <SettingsMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
