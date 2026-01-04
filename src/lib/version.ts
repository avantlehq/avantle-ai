// VERSION MANAGEMENT SYSTEM FOR AVANTLE.AI
// This file tracks the current version and changelog for the Avantle.ai platform

export const VERSION = '1.0.0'
export const VERSION_NAME = 'Admin Console Launch'

export const CHANGELOG = [
  {
    version: '1.0.0',
    name: 'Admin Console Launch',
    date: '2026-01-04',
    changes: [
      '🚀 **ADMIN CONSOLE COMPLETE**: Platform Admin Console (/admin) and Partner Portal (/partners)',
      '🏢 **PARTNER MANAGEMENT**: Full CRUD operations for partner organizations',
      '🏗️ **TENANT DASHBOARD**: System-wide tenant management with filtering and statistics',
      '🔐 **ROLE-BASED AUTH**: JWT authentication with Platform Admin and Partner Admin roles', 
      '🎨 **MODERN UI**: Card-based layout with DPIA color scheme and responsive design',
      '🔌 **CORE API INTEGRATION**: Connected to deployed core-avantle-ai control plane',
      '📊 **ADMIN DASHBOARD**: System statistics, activity feed, and usage analytics',
      '🛡️ **SECURITY**: Unauthorized access handling and proper role validation',
      '⚡ **PRODUCTION READY**: Full deployment ready with error handling and loading states'
    ]
  }
]

export const BUILD_DATE = new Date().toISOString().split('T')[0]
export const GIT_BRANCH = process.env.VERCEL_GIT_COMMIT_REF || 'main'
export const GIT_COMMIT = process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown'

// Helper function to get formatted version string
export function getVersionString(): string {
  return `v${VERSION}`
}

// Helper function to get full version info
export function getVersionInfo() {
  return {
    version: VERSION,
    name: VERSION_NAME,
    buildDate: BUILD_DATE,
    gitBranch: GIT_BRANCH,
    gitCommit: GIT_COMMIT,
    changelog: CHANGELOG
  }
}