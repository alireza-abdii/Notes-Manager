import { useTheme } from '../contexts/ThemeContext';
import { t } from '../utils/translations';
import { Button } from './ui';

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-amber-200 text-amber-900 hover:bg-amber-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
      aria-label={t('theme.toggle')}
    >
      {isDark ? (
        <>
          <span className="text-lg">☀️</span>
          <span className="hidden sm:inline">{t('theme.light')}</span>
        </>
      ) : (
        <>
          <span className="text-lg">🌙</span>
          <span className="hidden sm:inline">{t('theme.dark')}</span>
        </>
      )}
    </Button>
  );
}
