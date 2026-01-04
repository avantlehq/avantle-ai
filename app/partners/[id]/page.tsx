'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { requireAuth, isPartnerAdmin } from '@/lib/auth'
import { coreApi, Partner, Tenant } from '@/lib/api/core-client'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Globe, 
  Mail, 
  Calendar, 
  Shield, 
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

interface TenantTableProps {
  tenants: Tenant[]
  onTenantClick: (tenant: Tenant) => void
}

function TenantTable({ tenants, onTenantClick }: TenantTableProps) {
  if (tenants.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No tenants found</h3>
        <p className="text-muted-foreground">This partner hasn't created any tenants yet.</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-accent/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tenants.map((tenant) => (
              <tr 
                key={tenant.id} 
                className="hover:bg-accent/25 cursor-pointer transition-colors"
                onClick={() => onTenantClick(tenant)}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{tenant.name}</div>
                    <div className="text-sm text-muted-foreground">{tenant.slug}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${tenant.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                      tenant.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {tenant.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-1" />
                    {tenant.custom_domain || `${tenant.slug}.dpia.avantle.ai`}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(tenant.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default function PartnerDetailPage() {
  const [partner, setPartner] = useState<Partner | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const partnerId = params.id as string

  // Require partner admin authentication
  useEffect(() => {
    const user = requireAuth()
    if (user && !isPartnerAdmin(user)) {
      router.push('/unauthorized')
    }
  }, [router])

  useEffect(() => {
    async function fetchPartnerData() {
      try {
        setIsLoading(true)
        setError(null)

        const [partnerResponse, tenantsResponse] = await Promise.all([
          coreApi.getPartner(partnerId),
          coreApi.getTenants(1, 50, partnerId)
        ])

        if (partnerResponse.success && partnerResponse.data) {
          setPartner(partnerResponse.data)
        } else {
          setError(partnerResponse.error?.message || 'Failed to load partner')
        }

        if (tenantsResponse.success && tenantsResponse.data) {
          setTenants(tenantsResponse.data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (partnerId) {
      fetchPartnerData()
    }
  }, [partnerId])

  const handleTenantClick = (tenant: Tenant) => {
    router.push(`/admin/tenants/${tenant.id}`)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-accent rounded animate-pulse"></div>
            <div className="h-8 bg-accent rounded w-1/3 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-accent rounded w-2/3"></div>
                  <div className="h-6 bg-accent rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="/partners" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Partner Details</h1>
          </div>
          <Card className="p-6">
            <div className="text-center text-red-500">
              <p className="font-semibold">Error loading partner</p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-dpia-blue text-white rounded-lg hover:bg-dpia-blue/80 transition-colors"
              >
                Retry
              </button>
            </div>
          </Card>
        </div>
      </AdminLayout>
    )
  }

  if (!partner) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="/partners" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Partner Not Found</h1>
          </div>
          <Card className="p-6">
            <p className="text-muted-foreground">The requested partner could not be found.</p>
          </Card>
        </div>
      </AdminLayout>
    )
  }

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
              <h1 className="text-3xl font-bold text-foreground">{partner.name}</h1>
              <p className="text-muted-foreground">Partner organization details and tenant management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Partner Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                  ${partner.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                    partner.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}
                `}>
                  {partner.status}
                </span>
              </div>
              <Shield className="h-8 w-8 text-dpia-blue" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm font-semibold text-foreground mt-1">{partner.billing_email}</p>
              </div>
              <Mail className="h-8 w-8 text-dpia-green" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tenants</p>
                <p className="text-2xl font-bold text-foreground">{tenants.length}</p>
              </div>
              <Users className="h-8 w-8 text-dpia-orange" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {new Date(partner.created_at).toLocaleDateString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-dpia-blue" />
            </div>
          </Card>
        </div>

        {/* Partner Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Tenants */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Tenants</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-dpia-blue text-white rounded-lg hover:bg-dpia-blue/80 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Tenant</span>
                </button>
              </div>
              <TenantTable 
                tenants={tenants} 
                onTenantClick={handleTenantClick}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Partner Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Partner Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Organization Name</label>
                  <p className="text-foreground font-medium">{partner.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Billing Email</label>
                  <p className="text-foreground">{partner.billing_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Partner ID</label>
                  <p className="text-xs font-mono text-muted-foreground">{partner.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-foreground">{new Date(partner.created_at).toLocaleString()}</p>
                </div>
                {partner.updated_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="text-foreground">{new Date(partner.updated_at).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Plus className="h-4 w-4 text-dpia-blue" />
                    <span className="text-sm font-medium">Create New Tenant</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-dpia-green" />
                    <span className="text-sm font-medium">Manage Domains</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Edit className="h-4 w-4 text-dpia-orange" />
                    <span className="text-sm font-medium">Edit Partner Details</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}