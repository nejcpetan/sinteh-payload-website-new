export const locales = ['sl', 'en', 'de', 'hr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'sl'
export const fallbackLocale: Locale = 'en'

export interface LocaleConfig {
  code: Locale
  label: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  sl: {
    code: 'sl',
    label: 'Slovenščina',
    flag: 'SI',
    dir: 'ltr',
  },
  en: {
    code: 'en',
    label: 'English',
    flag: 'EN',
    dir: 'ltr',
  },
  de: {
    code: 'de',
    label: 'Deutsch',
    flag: 'DE',
    dir: 'ltr',
  },
  hr: {
    code: 'hr',
    label: 'Hrvatski',
    flag: 'HR',
    dir: 'ltr',
  },
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return localeConfig[locale]
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale
  }

  return null
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return '/' + segments.slice(2).join('/')
  }

  return pathname
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname)
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}

export function getAlternateUrls(pathname: string, baseUrl: string): Record<Locale, string> {
  const cleanPath = removeLocaleFromPath(pathname)
  const alternates: Record<Locale, string> = {} as Record<Locale, string>

  for (const locale of locales) {
    alternates[locale] = `${baseUrl}/${locale}${cleanPath === '/' ? '' : cleanPath}`
  }

  return alternates
}

export function getCanonicalUrl(pathname: string, locale: Locale, baseUrl: string): string {
  const cleanPath = removeLocaleFromPath(pathname)
  return `${baseUrl}/${locale}${cleanPath === '/' ? '' : cleanPath}`
}
