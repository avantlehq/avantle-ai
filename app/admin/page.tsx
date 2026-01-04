'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { requireAuth } from '@/lib/auth'
import { coreApi, AdminStats, AdminActivity } from '@/lib/api/core-client'
import { Card } from '@/components/ui/card'
import { Users, Building2, Globe, TrendingUp, Clock, Activity } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: React.ComponentType<any>
  description?: string
}

function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-dpia-blue/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-dpia-blue" />
        </div>
      </div>
    </Card>
  )
}

function ActivityFeed({ activities }: { activities: AdminActivity[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Activity className="h-5 w-5 text-dpia-blue mr-2" />
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-sm">No recent activity</p>
        ) : (
          activities.slice(0, 10).map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-b-0">
              <div className="h-2 w-2 rounded-full bg-dpia-blue mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{activity.actor}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

function TopPartners({ partners }: { partners: AdminStats['top_partners'] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 text-dpia-green mr-2" />
        Top Partners
      </h3>
      <div className="space-y-3">
        {partners.length === 0 ? (
          <p className="text-muted-foreground text-sm">No partner data available</p>
        ) : (
          partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <div>
                <p className="font-medium text-foreground">{partner.partner_name}</p>
                <p className="text-sm text-muted-foreground">
                  {partner.tenant_count} tenant{partner.tenant_count !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{partner.total_usage.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">usage</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [activities, setActivities] = useState<AdminActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Require admin authentication
  useEffect(() => {
    requireAuth('PLATFORM_ADMIN')
  }, [])

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true)
        setError(null)

        const [statsResponse, activitiesResponse] = await Promise.all([
          coreApi.getAdminStats(),
          coreApi.getAdminActivity(1, 20)
        ])

        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data)
        } else {
          setError(statsResponse.error?.message || 'Failed to load statistics')
        }

        if (activitiesResponse.success && activitiesResponse.data) {
          setActivities(activitiesResponse.data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-accent rounded w-2/3 mb-2"></div>
                  <div className="h-8 bg-accent rounded w-1/2"></div>
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
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <Card className="p-6">
            <div className="text-center text-red-500">
              <p className="font-semibold">Error loading dashboard</p>
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
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Platform administration and monitoring</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Partners"
              value={stats.overview.total_partners}
              icon={Building2}
              description="Active organizations"
            />
            <StatsCard
              title="Tenants"
              value={stats.overview.total_tenants}
              icon={Users}
              description="Total tenant instances"
            />
            <StatsCard
              title="Domains"
              value={stats.overview.total_domains}
              icon={Globe}
              description="Registered domains"
            />
            <StatsCard
              title="Monthly Usage"
              value={stats.activity.total_usage_this_month}
              icon={TrendingUp}
              description="This month's activity"
            />
          </div>
        )}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed activities={activities} />
          {stats && <TopPartners partners={stats.top_partners} />}
        </div>
      </div>
    </AdminLayout>
  )
}