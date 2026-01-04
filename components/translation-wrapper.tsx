'use client'

import { TranslationProvider } from '@/lib/i18n/use-translation'

export function TranslationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      {children}
    </TranslationProvider>
  )
}