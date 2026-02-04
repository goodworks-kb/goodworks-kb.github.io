import { translations, Language } from './translations';

const STORAGE_KEY = 'gwkb_language';
const DEFAULT_LANG: Language = 'en';
const SUPPORTED_LANGS: Language[] = ['en', 'ko', 'es'];

export function getCurrentLanguage(): Language {
  // Check localStorage first
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored as Language)) {
      return stored as Language;
    }
  } catch (e) {
    // localStorage not available
  }

  // Check browser language
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang) {
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(langCode as Language)) {
      return langCode as Language;
    }
  }

  return DEFAULT_LANG;
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // localStorage not available
  }
}

export function getTranslation(key: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const langTranslations = translations[currentLang] || translations[DEFAULT_LANG];
  return (langTranslations as any)[key] || key;
}

export { translations, DEFAULT_LANG, SUPPORTED_LANGS };
export type { Language };
