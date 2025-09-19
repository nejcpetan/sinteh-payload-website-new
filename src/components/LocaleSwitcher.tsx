'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  locales,
  type Locale,
  getLocaleFromPath,
  addLocaleToPath,
  removeLocaleFromPath,
} from '@/lib/i18n/config'

interface LocaleSwitcherProps {
  currentLocale: Locale
  className?: string
}

export function LocaleSwitcher({ currentLocale, className }: LocaleSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (newLocale: Locale) => {
    // Get the current path without locale
    const pathWithoutLocale = removeLocaleFromPath(pathname)

    // Add the new locale to the path
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale)

    // Navigate to the new path
    router.push(newPath)
  }

  return (
    <div className={`flex items-center gap-2 text-xs text-foreground/70 ${className || ''}`}>
      {locales.map((locale, index) => (
        <div key={locale} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(locale)}
            className={`transition-colors hover:text-foreground ${
              locale === currentLocale ? 'text-foreground font-medium' : 'text-foreground/70'
            }`}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && <span className="opacity-40 mx-2">|</span>}
        </div>
      ))}
    </div>
  )
}

interface MobileLocaleSwitcherProps {
  currentLocale: Locale
  onLocaleChange?: () => void
}

export function MobileLocaleSwitcher({ currentLocale, onLocaleChange }: MobileLocaleSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (newLocale: Locale) => {
    // Get the current path without locale
    const pathWithoutLocale = removeLocaleFromPath(pathname)

    // Add the new locale to the path
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale)

    // Navigate to the new path
    router.push(newPath)

    // Call optional callback (e.g., to close mobile menu)
    if (onLocaleChange) {
      onLocaleChange()
    }
  }

  return (
    <div className="flex items-center justify-center gap-4 text-sm text-foreground/70">
      {locales.map((locale, index) => (
        <div key={locale} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(locale)}
            className={`py-2 px-3 hover:bg-background rounded-md transition-colors ${
              locale === currentLocale
                ? 'text-foreground font-medium bg-background'
                : 'text-foreground/70'
            }`}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && <span className="opacity-40">|</span>}
        </div>
      ))}
    </div>
  )
}
