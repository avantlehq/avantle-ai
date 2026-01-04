'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { login } from '@/lib/auth'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(email, password)
      
      if (result.success && result.user) {
        // Redirect based on role
        if (result.user.role === 'PLATFORM_ADMIN') {
          router.push('/admin')
        } else if (result.user.role === 'PARTNER_ADMIN') {
          router.push('/partners')
        } else {
          router.push('/')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8">
            <Shield className="h-10 w-10 text-dpia-blue" />
            <span className="text-2xl font-bold text-foreground">Avantle</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Admin Login</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to access the control plane
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-3 py-2 border border-border rounded-lg
                  bg-background text-foreground placeholder-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-dpia-blue focus:border-transparent
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                placeholder="admin@avantle.ai"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full px-3 py-2 border border-border rounded-lg pr-10
                    bg-background text-foreground placeholder-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-dpia-blue focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="
                w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
                text-sm font-medium text-white bg-dpia-blue hover:bg-dpia-blue/80
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dpia-blue
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </Card>

        {/* Demo Credentials */}
        <Card className="p-6 bg-accent/50">
          <h3 className="font-medium text-foreground mb-2">Demo Credentials</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Platform Admin:</span>
              <br />
              <code className="text-xs bg-background px-2 py-1 rounded">admin@avantle.ai / adminpass123</code>
            </div>
            <div>
              <span className="font-medium">Partner Admin:</span>
              <br />
              <code className="text-xs bg-background px-2 py-1 rounded">admin@demo-company.com / partneradmin123</code>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <Link href="/" className="text-dpia-blue hover:text-dpia-blue/80 text-sm">
            ← Back to Avantle.ai
          </Link>
        </div>
      </div>
    </div>
  )
}