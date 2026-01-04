'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { requireAuth, isPartnerAdmin } from '@/lib/auth'
import { coreApi } from '@/lib/api/core-client'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Building2, Mail, Save, X } from 'lucide-react'
import Link from 'next/link'

interface PartnerFormData {
  name: string
  billing_email: string
  contact_name: string
  contact_phone: string
}

export default function NewPartnerPage() {
  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    billing_email: '',
    contact_name: '',
    contact_phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Require partner admin authentication
  React.useEffect(() => {
    const user = requireAuth()
    if (user && !isPartnerAdmin(user)) {
      router.push('/unauthorized')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await coreApi.createPartner({
        name: formData.name,
        billing_email: formData.billing_email,
        metadata: {
          contact_name: formData.contact_name,
          contact_phone: formData.contact_phone
        }
      })

      if (response.success && response.data) {
        router.push(`/partners/${response.data.id}`)
      } else {
        setError(response.error?.message || 'Failed to create partner')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name.trim() && formData.billing_email.trim()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/partners" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New Partner</h1>
              <p className="text-muted-foreground">Add a new partner organization to the platform</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-600" />
                    <p className="text-red-800 text-sm font-medium">Error creating partner</p>
                  </div>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              )}

              {/* Organization Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="h-5 w-5 text-dpia-blue" />
                  <h2 className="text-lg font-semibold text-foreground">Organization Details</h2>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Acme Corporation"
                    className="
                      w-full px-3 py-2 border border-border rounded-lg
                      bg-background text-foreground placeholder-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-dpia-blue focus:border-transparent
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="billing_email" className="block text-sm font-medium text-foreground mb-2">
                    Billing Email *
                  </label>
                  <input
                    type="email"
                    id="billing_email"
                    name="billing_email"
                    required
                    value={formData.billing_email}
                    onChange={handleInputChange}
                    placeholder="billing@acmecorp.com"
                    className="
                      w-full px-3 py-2 border border-border rounded-lg
                      bg-background text-foreground placeholder-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-dpia-blue focus:border-transparent
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This email will be used for billing and important notifications
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="h-5 w-5 text-dpia-green" />
                  <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </div>

                <div>
                  <label htmlFor="contact_name" className="block text-sm font-medium text-foreground mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="
                      w-full px-3 py-2 border border-border rounded-lg
                      bg-background text-foreground placeholder-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-dpia-blue focus:border-transparent
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="contact_phone" className="block text-sm font-medium text-foreground mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="
                      w-full px-3 py-2 border border-border rounded-lg
                      bg-background text-foreground placeholder-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-dpia-blue focus:border-transparent
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                <Link
                  href="/partners"
                  className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="
                    flex items-center space-x-2 px-4 py-2 
                    bg-dpia-blue text-white rounded-lg 
                    hover:bg-dpia-blue/80 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Create Partner</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Card>

          {/* Information Card */}
          <Card className="p-6 mt-6 bg-blue-50/50 border-blue-200">
            <h3 className="font-medium text-foreground mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• The partner organization will be created with ACTIVE status</li>
              <li>• Partner admins can be invited to manage tenants</li>
              <li>• Tenants can be created under this partner organization</li>
              <li>• Billing will be associated with the provided email</li>
            </ul>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}