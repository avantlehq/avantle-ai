'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth'
import { coreApi, Tenant } from '@/lib/api/core-client'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { 
  Users, 
  Building2, 
  Globe, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ExternalLink,
  Shield
} from 'lucide-react'

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
        <p className="text-muted-foreground">Get started by creating your first tenant instance.</p>
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
                Partner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 mr-1" />
                    {tenant.partner_id}
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
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded text-xs font-medium
                    ${tenant.tenant_type === 'UI' ? 'bg-blue-100 text-blue-800' :
                      tenant.tenant_type === 'API' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'}
                  `}>
                    {tenant.tenant_type}
                  </span>
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

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'UI' | 'API' | 'HYBRID'>('all')
  const router = useRouter()

  // Require platform admin authentication
  useEffect(() => {
    requireAuth('PLATFORM_ADMIN')
  }, [])

  useEffect(() => {
    async function fetchTenants() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await coreApi.getTenants(1, 100) // Get more tenants for admin view
        
        if (response.success && response.data) {
          setTenants(response.data)
        } else {
          setError(response.error?.message || 'Failed to load tenants')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenants()
  }, [])

  const handleTenantClick = (tenant: Tenant) => {
    router.push(`/admin/tenants/${tenant.id}`)
  }

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || tenant.tenant_type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === 'ACTIVE').length,
    pending: tenants.filter(t => t.status === 'PENDING').length,
    ui: tenants.filter(t => t.tenant_type === 'UI').length,
    api: tenants.filter(t => t.tenant_type === 'API').length,
    hybrid: tenants.filter(t => t.tenant_type === 'HYBRID').length
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
          </div>
          <Card className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-accent rounded w-1/4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-accent rounded"></div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
          <Card className="p-6">
            <div className="text-center text-red-500">
              <p className="font-semibold">Error loading tenants</p>
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
            <p className="text-muted-foreground">Manage tenant instances across all partners</p>
          </div>
          <Link 
            href="/admin/tenants/new"
            className="flex items-center space-x-2 px-4 py-2 bg-dpia-blue text-white rounded-lg hover:bg-dpia-blue/80 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Tenant</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Users className="h-6 w-6 text-dpia-blue" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-xl font-bold text-foreground">{stats.active}</p>
              </div>
              <Shield className="h-6 w-6 text-dpia-green" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <Building2 className="h-6 w-6 text-dpia-orange" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">UI</p>
                <p className="text-xl font-bold text-foreground">{stats.ui}</p>
              </div>
              <Globe className="h-6 w-6 text-blue-500" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API</p>
                <p className="text-xl font-bold text-foreground">{stats.api}</p>
              </div>
              <ExternalLink className="h-6 w-6 text-purple-500" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hybrid</p>
                <p className="text-xl font-bold text-foreground">{stats.hybrid}</p>
              </div>
              <Building2 className="h-6 w-6 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-dpia-blue"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-dpia-blue"
            >
              <option value="all">All Types</option>
              <option value="UI">UI Only</option>
              <option value="API">API Only</option>
              <option value="HYBRID">Hybrid</option>
            </select>
            <button className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {filteredTenants.length} of {tenants.length} tenants</p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-dpia-blue hover:text-dpia-blue/80"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Tenants Table */}
        <TenantTable 
          tenants={filteredTenants} 
          onTenantClick={handleTenantClick}
        />
      </div>
    </AdminLayout>
  )
}