'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { defaultLocale, type Locale } from './locales'
import { translations, type Translation } from './translations'

interface TranslationContextType {
  t: Translation
  locale: Locale
  setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load locale from localStorage on mount
    const saved = localStorage.getItem('locale') as Locale
    if (saved && translations[saved]) {
      setLocaleState(saved)
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = translations[locale]

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div>{children}</div>
  }

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  )
}

// Hook to use translations
export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}