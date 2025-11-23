// Avantle.ai Version Information
export const VERSION = "0.2.0" as const
export const VERSION_NAME = "DPIA Theme Unification" as const
export const BUILD_DATE = new Date().toISOString().split('T')[0]

export const getVersionInfo = () => ({
  version: VERSION,
  name: VERSION_NAME,
  buildDate: BUILD_DATE,
  displayName: `v${VERSION} (${VERSION_NAME})`,
  fullDisplayName: `Avantle.ai v${VERSION} - ${VERSION_NAME}`,
})

// Version changelog
export const CHANGELOG = {
  "0.2.0": {
    date: "2024-11-23",
    name: "DPIA Theme Unification",
    features: [
      "Unified ultra-soft RGB(25,39,52) theme system with DPIA Agent",
      "Complete CSS variables system for consistent theming",
      "DPIA category color system integration (blue, green, orange, red, purple, gray)",
      "Theme-aware gradients and opacity standards",
      "Tailwind configuration with DPIA styling utilities",
      "Version tracking system implementation"
    ],
    improvements: [
      "Consistent branding across Avantle.ai ecosystem",
      "Professional dark mode with enterprise-grade polish",
      "Standardized color palette and visual hierarchy",
      "Enhanced development experience with organized styling system",
      "Future-ready theme architecture for light/dark mode switching"
    ],
    technical: [
      "Migrated from HSL to RGB-based color system",
      "CSS variables for theme consistency",
      "Tailwind v4 with custom utility classes",
      "Inter font family integration",
      "Theme-aware background gradients"
    ]
  },
  "0.1.0": {
    date: "2024-11-20",
    name: "Initial Release",
    features: [
      "Next.js 16 application with App Router",
      "TypeScript with strict configuration",
      "Tailwind CSS styling system",
      "Lucide React icons integration",
      "Responsive design foundation",
      "Professional landing page structure"
    ],
    improvements: [
      "Modern React architecture",
      "Clean codebase with ESLint configuration",
      "Production-ready deployment setup",
      "SEO-optimized metadata"
    ],
    technical: [
      "Next.js 16.0.1 framework",
      "TypeScript 5+ with strict mode",
      "Tailwind CSS 3.4.1",
      "ESLint 9 with Next.js config",
      "Vercel deployment ready"
    ]
  }
} as const