import { useTheme } from '../contexts/ThemeContext';
import { t } from '../utils/translations';

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary flex items-center gap-2"
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
    </button>
  );
}
