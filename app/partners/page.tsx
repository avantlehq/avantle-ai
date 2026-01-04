'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { requireAuth, isPartnerAdmin } from '@/lib/auth'
import { coreApi, Partner } from '@/lib/api/core-client'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { Users, Building2, Plus, Search, Filter, MoreVertical } from 'lucide-react'

interface PartnerTableProps {
  partners: Partner[]
  onPartnerClick: (partner: Partner) => void
}

function PartnerTable({ partners, onPartnerClick }: PartnerTableProps) {
  if (partners.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No partners found</h3>
        <p className="text-muted-foreground">Get started by creating your first partner organization.</p>
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
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Tenants
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
            {partners.map((partner) => (
              <tr 
                key={partner.id} 
                className="hover:bg-accent/25 cursor-pointer transition-colors"
                onClick={() => onPartnerClick(partner)}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{partner.name}</div>
                    <div className="text-sm text-muted-foreground">{partner.billing_email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${partner.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                      partner.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {partner.tenant_count}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(partner.created_at).toLocaleDateString()}
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

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  // Require partner admin authentication
  useEffect(() => {
    const user = requireAuth()
    if (user && !isPartnerAdmin(user)) {
      router.push('/unauthorized')
    }
  }, [router])

  useEffect(() => {
    async function fetchPartners() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await coreApi.getPartners(1, 50)
        
        if (response.success && response.data) {
          setPartners(response.data)
        } else {
          setError(response.error?.message || 'Failed to load partners')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPartners()
  }, [])

  const handlePartnerClick = (partner: Partner) => {
    router.push(`/partners/${partner.id}`)
  }

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.billing_email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Partners</h1>
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
          <h1 className="text-3xl font-bold text-foreground">Partners</h1>
          <Card className="p-6">
            <div className="text-center text-red-500">
              <p className="font-semibold">Error loading partners</p>
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
            <h1 className="text-3xl font-bold text-foreground">Partners</h1>
            <p className="text-muted-foreground">Manage partner organizations and their access</p>
          </div>
          <Link 
            href="/partners/new"
            className="flex items-center space-x-2 px-4 py-2 bg-dpia-blue text-white rounded-lg hover:bg-dpia-blue/80 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Partner</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Partners</p>
                <p className="text-2xl font-bold text-foreground">{partners.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-dpia-blue" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
                <p className="text-2xl font-bold text-foreground">
                  {partners.filter(p => p.status === 'ACTIVE').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-dpia-green" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tenants</p>
                <p className="text-2xl font-bold text-foreground">
                  {partners.reduce((sum, p) => sum + p.tenant_count, 0)}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-dpia-orange" />
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
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-dpia-blue"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </Card>

        {/* Partners Table */}
        <PartnerTable 
          partners={filteredPartners} 
          onPartnerClick={handlePartnerClick}
        />
      </div>
    </AdminLayout>
  )
}