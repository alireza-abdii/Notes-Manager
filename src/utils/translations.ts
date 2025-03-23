type Language = 'en' | 'fa';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    'notes.title': 'Notes',
    'notes.add': 'Add Note',
    'notes.edit': 'Edit Note',
    'notes.delete': 'Delete Note',
    'notes.empty': 'No notes yet. Create your first note!',
    'notes.title.placeholder': 'Note title',
    'notes.content.placeholder': 'Note content',
    'notes.tags.placeholder': 'Add tags (comma separated)',
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
  },
  fa: {
    'notes.title': 'یادداشت‌ها',
    'notes.add': 'افزودن یادداشت',
    'notes.edit': 'ویرایش یادداشت',
    'notes.delete': 'حذف یادداشت',
    'notes.empty': 'هنوز یادداشتی وجود ندارد. اولین یادداشت خود را ایجاد کنید!',
    'notes.title.placeholder': 'عنوان یادداشت',
    'notes.content.placeholder': 'محتوی یادداشت',
    'notes.tags.placeholder': 'افزودن برچسب‌ها (با کاما جدا شده)',
    'theme.toggle': 'تغییر تم',
    'theme.light': 'حالت روشن',
    'theme.dark': 'حالت تاریک',
    'settings.title': 'تنظیمات',
    'settings.language': 'زبان',
    'settings.theme': 'تم',
  },
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}
