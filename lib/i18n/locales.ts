// Supported locales for the application
export const locales = ['en', 'sk', 'de'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

// Language names for display
export const languageNames: Record<Locale, string> = {
  en: 'English',
  sk: 'Slovenčina', 
  de: 'Deutsch'
}

// Language flags/codes for display
export const languageFlags: Record<Locale, string> = {
  en: 'EN',
  sk: 'SK', 
  de: 'DE'
}