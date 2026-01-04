'use client'

import Link from 'next/link'
import { Shield, Home, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
              You don't have permission to access this page
            </p>
          </div>
        </div>

        {/* Error Details */}
        <Card className="p-6 text-left">
          <h2 className="font-semibold text-foreground mb-3">Insufficient Privileges</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              This page requires specific administrative privileges that your account doesn't currently have.
            </p>
            <div className="mt-4">
              <h3 className="font-medium text-foreground mb-2">Required Access Levels:</h3>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>Platform Admin:</strong> Full system administration</li>
                <li><strong>Partner Admin:</strong> Partner and tenant management</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-dpia-blue text-white rounded-lg hover:bg-dpia-blue/80 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Go to Homepage</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-border text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need access? Contact your system administrator.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Shield className="h-4 w-4" />
            <span>Avantle.ai</span>
          </Link>
        </div>
      </div>
    </div>
  )
}