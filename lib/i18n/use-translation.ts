'use client'

import { useState, useEffect } from 'react'
import { defaultLocale, type Locale } from './locales'
import { translations } from './translations'

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved locale from localStorage
    const saved = localStorage.getItem('locale') as Locale
    if (saved && saved in translations) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  // Always use the current locale, but fallback to default during SSR
  const currentLocale = mounted ? locale : defaultLocale
  const t = translations[currentLocale]

  return { t, locale: currentLocale, setLocale }
}