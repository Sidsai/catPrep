'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Welcome() {
  const steps = [
    {
      number: '1',
      title: 'Create Your Account',
      description: 'Sign up with your email and set a strong password',
      action: 'Register Now',
      href: '/register',
      details: [
        'Takes less than 2 minutes',
        'No credit card required',
        'Instant access to all features'
      ]
    },
    {
      number: '2',
      title: 'Set Up Your Profile',
      description: 'Add your personal information and preferences',
      action: 'Continue',
      details: [
        'Choose notification preferences',
        'Set exam target date',
        'Select focus areas'
      ]
    },
    {
      number: '3',
      title: 'Take Your First Test',
      description: 'Start with a practice test to establish baseline',
      action: 'Start Test',
      details: [
        '100+ tests available',
        'Multiple difficulty levels',
        'Realistic 3-hour format'
      ]
    },
    {
      number: '4',
      title: 'Review Performance',
      description: 'Check your scores and identify improvement areas',
      action: 'View Analytics',
      details: [
        'Detailed score breakdown',
        'Category-wise analysis',
        'Visual performance charts'
      ]
    },
    {
      number: '5',
      title: 'Follow Recommendations',
      description: 'Get personalized study tips based on results',
      action: 'See Recommendations',
      details: [
        'Priority-based suggestions',
        'Targeted practice areas',
        'Adaptive difficulty'
      ]
    },
    {
      number: '6',
      title: 'Create Study Plan',
      description: 'Build a structured preparation timeline',
      action: 'Plan Your Study',
      details: [
        'Custom timelines',
        'Goal setting',
        'Progress tracking'
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">CAT Prep Tracker</h1>
              <p className="text-sm text-muted-foreground mt-1">Master Your Exam with Data-Driven Preparation</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Start Your CAT Journey in 6 Steps</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From signup to mastery: A complete guide to using CAT Prep Tracker effectively
          </p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-4xl font-bold text-primary/30 mb-2">Step {step.number}</div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                    <CardDescription className="mt-2">{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                  {step.href && (
                    <Button className="w-full" asChild>
                      <Link href={step.href}>{step.action}</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-card border-y border-border py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Students Love CAT Prep Tracker</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: '10K+', label: 'Active Users', icon: '👥' },
              { metric: '100+', label: 'Practice Tests', icon: '📝' },
              { metric: '95%', label: 'Success Rate', icon: '🎯' },
              { metric: '24/7', label: 'Email Support', icon: '💬' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-background border border-border">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{item.metric}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-12">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '📊',
              title: 'Real-time Analytics',
              description: 'Track scores, accuracy, and performance trends with interactive charts'
            },
            {
              icon: '🎯',
              title: 'Adaptive Learning',
              description: 'Get personalized recommendations based on your performance patterns'
            },
            {
              icon: '📧',
              title: 'Smart Notifications',
              description: 'Daily reminders, weekly reports, and monthly analysis via email'
            },
            {
              icon: '📝',
              title: 'Study Planning',
              description: 'Create custom study schedules with milestones and goals'
            },
            {
              icon: '🧪',
              title: 'Practice Tests',
              description: 'CAT-format tests with realistic time limits and difficulty levels'
            },
            {
              icon: '🔐',
              title: 'Secure & Private',
              description: 'Your data is encrypted and securely stored with bcryptjs hashing'
            }
          ].map((feature, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-card border-y border-border py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How do I get started?',
                a: 'Click "Sign Up", create your account, and you\'ll have instant access to all features. Check the Getting Started guide for detailed steps.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! You get full access to all features when you sign up. No credit card required for the free tier.'
              },
              {
                q: 'How often should I take tests?',
                a: 'We recommend 3-4 tests per week for optimal preparation. The scheduler will remind you via email.'
              },
              {
                q: 'Can I retake tests?',
                a: 'Absolutely! You can attempt any test multiple times. Each attempt is tracked for progress comparison.'
              },
              {
                q: 'How are recommendations generated?',
                a: 'Our system analyzes your performance across categories and creates priority-based suggestions for improvement areas.'
              },
              {
                q: 'What if I miss an email notification?',
                a: 'All past reports are available in your Analytics dashboard. You can also customize notification settings anytime.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-lg border border-border bg-background">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Ace Your CAT?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of students using CAT Prep Tracker to improve their scores and achieve their dreams.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/getting-started">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>CAT Prep Tracker © 2024. Master your exam with data-driven preparation.</p>
        </div>
      </footer>
    </main>
  )
}
