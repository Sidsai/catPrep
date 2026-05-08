'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface User {
  id: number
  email: string
  full_name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First check if user is authenticated
        const authRes = await fetch('/api/auth/me', {
          credentials: 'include', // Important: include cookies
        })
        
        console.log('[v0] Auth check response:', authRes.status)

        if (!authRes.ok) {
          console.log('[v0] Auth failed, redirecting to login')
          router.push('/login')
          return
        }

        // Fetch user data
        const userData = await authRes.json()
        setUser(userData.user)

        // Fetch performance stats
        const statsRes = await fetch('/api/analytics/performance', {
          credentials: 'include',
        })
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
      } catch (err) {
        console.error('[v0] Error fetching user data:', err)
        setError('Failed to load dashboard. Please try logging in again.')
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (err) {
      console.error('[v0] Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">CAT Prep Tracker</div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.full_name}
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your CAT preparation progress and performance
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Button asChild size="lg" className="h-auto py-6">
            <Link href="/practice-test">
              <div className="text-left">
                <div className="text-lg font-semibold">Start Practice Test</div>
                <div className="text-sm opacity-90">Take a full-length test</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-auto py-6">
            <Link href="/analytics">
              <div className="text-left">
                <div className="text-lg font-semibold">View Analytics</div>
                <div className="text-sm opacity-90">Check your performance</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-auto py-6">
            <Link href="/recommendations">
              <div className="text-left">
                <div className="text-lg font-semibold">Recommendations</div>
                <div className="text-sm opacity-90">Get personalized tips</div>
              </div>
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-sm font-medium text-muted-foreground">
                Total Tests
              </div>
              <div className="text-3xl font-bold text-primary mt-2">
                {stats.overall_stats?.total_tests || 0}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-sm font-medium text-muted-foreground">
                Average Score
              </div>
              <div className="text-3xl font-bold text-primary mt-2">
                {stats.overall_stats?.average_score
                  ? Math.round(stats.overall_stats.average_score)
                  : 'N/A'}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-sm font-medium text-muted-foreground">
                Average Accuracy
              </div>
              <div className="text-3xl font-bold text-primary mt-2">
                {stats.overall_stats?.average_accuracy
                  ? stats.overall_stats.average_accuracy.toFixed(1)
                  : 'N/A'}
                %
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-sm font-medium text-muted-foreground">
                Best Score
              </div>
              <div className="text-3xl font-bold text-primary mt-2">
                {stats.overall_stats?.best_score || 'N/A'}
              </div>
            </div>
          </div>
        )}

        {/* Category Performance */}
        {stats?.category_performance && stats.category_performance.length > 0 && (
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Category Performance
            </h2>
            <div className="space-y-3">
              {stats.category_performance.map((cat: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {cat.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {cat.accuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${cat.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
