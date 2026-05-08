'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by making a request
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        setIsLoggedIn(res.ok)
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
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
          <div className="flex gap-4">
            {isLoggedIn ? (
              <>
                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="outline" onClick={() => router.push('/settings')}>
                  Settings
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/getting-started">Getting Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Master CAT with{' '}
              <span className="text-primary">Data-Driven Practice</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Track your performance, identify weak areas, and get personalized recommendations to boost your CAT scores.
            </p>
            <div className="flex gap-4">
              {isLoggedIn ? (
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/getting-started">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Practice Tests</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
              <p className="text-muted-foreground">Analytics</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">Adaptive</div>
              <p className="text-muted-foreground">Recommendations</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">Smart</div>
              <p className="text-muted-foreground">Scheduling</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="text-primary mb-4 text-2xl">📊</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Performance Analytics
              </h3>
              <p className="text-muted-foreground">
                Track your scores, accuracy, and time spent across different test categories.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="text-primary mb-4 text-2xl">🎯</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Adaptive Learning
              </h3>
              <p className="text-muted-foreground">
                Get personalized recommendations based on your weak areas and learning patterns.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-background">
              <div className="text-primary mb-4 text-2xl">📧</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Smart Notifications
              </h3>
              <p className="text-muted-foreground">
                Daily reminders, weekly reports, and monthly analysis delivered to your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Ready to Ace Your CAT?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of students tracking their progress and improving their scores.
        </p>
        {!isLoggedIn && (
          <Button size="lg" asChild>
            <Link href="/register">Start Your Free Journey</Link>
          </Button>
        )}
      </div>
    </main>
  )
}
