'use client'

import { useState, useEffect } from 'react'
import { defaultLocale, type Locale } from './locales'
import { translations } from './translations'

// Global state management
let globalLocale: Locale = defaultLocale
let globalSetters: Array<(locale: Locale) => void> = []

// Custom event for cross-component communication
const LOCALE_CHANGE_EVENT = 'locale-change'

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(globalLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load saved locale from localStorage
    const saved = localStorage.getItem('locale') as Locale
    if (saved && saved in translations) {
      globalLocale = saved
      setLocaleState(saved)
    }

    // Register this component to receive updates
    globalSetters.push(setLocaleState)

    // Listen for locale changes from other components
    const handleLocaleChange = (event: CustomEvent) => {
      const newLocale = event.detail as Locale
      setLocaleState(newLocale)
    }

    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange)

    // Cleanup when component unmounts
    return () => {
      globalSetters = globalSetters.filter(setter => setter !== setLocaleState)
      window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    // Update global state
    globalLocale = newLocale
    localStorage.setItem('locale', newLocale)
    
    // Update all registered components
    globalSetters.forEach(setter => setter(newLocale))
    
    // Broadcast to all components via custom event
    window.dispatchEvent(new CustomEvent(LOCALE_CHANGE_EVENT, { detail: newLocale }))
  }

  // Always use the current locale, but fallback to default during SSR
  const currentLocale = mounted ? locale : defaultLocale
  const t = translations[currentLocale]

  return { t, locale: currentLocale, setLocale }
}