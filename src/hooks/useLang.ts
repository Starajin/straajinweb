import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

/**
 * Hook that returns a helper to pick the correct bilingual field
 * based on the current i18n language.
 *
 * Usage:
 *   const { lang, pick } = useLang();
 *   pick(item, 'title')  // returns item.title_en or item.title_ko
 *   pick(item, 'description', 'No description')  // with fallback
 */
export function useLang() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || 'ko').startsWith('ko') ? 'ko' : 'en';
  const altLang = lang === 'ko' ? 'en' : 'ko';

  const pick = useCallback(
    (item: any, field: string, fallback: string = '') => {
      if (!item) return fallback;
      return item[`${field}_${lang}`] || item[`${field}_${altLang}`] || fallback;
    },
    [lang, altLang]
  );

  return { lang, pick };
}
