'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GettingStarted() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-2xl font-bold text-primary">CAT Prep Tracker</div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use CAT Prep Tracker to maximize your exam preparation and achieve your best scores.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Step 1: Account Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 1: Create Your Account</CardTitle>
            <CardDescription>Set up your profile in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-foreground">
                <strong>1.</strong> Click on the <span className="bg-primary/20 px-2 py-1 rounded">Sign Up</span> button on the homepage
              </p>
              <p className="text-foreground">
                <strong>2.</strong> Enter your details:
              </p>
              <ul className="list-disc pl-8 text-muted-foreground space-y-1">
                <li>Full Name (e.g., "John Doe")</li>
                <li>Email Address (used for login and notifications)</li>
                <li>Strong Password (at least 8 characters recommended)</li>
              </ul>
              <p className="text-foreground">
                <strong>3.</strong> Click <span className="bg-primary/20 px-2 py-1 rounded">Register</span> to create your account
              </p>
              <p className="text-foreground">
                <strong>4.</strong> You'll be automatically logged in and redirected to the Dashboard
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Dashboard Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 2: Explore the Dashboard</CardTitle>
            <CardDescription>Understand the main interface</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">The Dashboard is your home page with quick access to everything:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Left Sidebar</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dashboard - Main overview</li>
                  <li>• Practice Tests - Browse tests</li>
                  <li>• Analytics - View performance</li>
                  <li>• Recommendations - Get tips</li>
                  <li>• Study Plans - Track goals</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Main Area</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Stats Cards - Overall metrics</li>
                  <li>• Recent Tests - Your last 5 tests</li>
                  <li>• Performance Chart - Visual trends</li>
                  <li>• Quick Actions - Start new test</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Taking a Practice Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 3: Take Your First Practice Test</CardTitle>
            <CardDescription>Complete a full practice test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-foreground">
                <strong>1.</strong> Navigate to <span className="bg-primary/20 px-2 py-1 rounded">Practice Tests</span> from the sidebar
              </p>
              <p className="text-foreground">
                <strong>2.</strong> Browse available tests (filter by difficulty: Easy, Medium, Hard)
              </p>
              <p className="text-foreground">
                <strong>3.</strong> Click <span className="bg-primary/20 px-2 py-1 rounded">Start Test</span> on a test card
              </p>
              <p className="text-foreground">
                <strong>4.</strong> During the test:
              </p>
              <ul className="list-disc pl-8 text-muted-foreground space-y-1">
                <li>Timer shows remaining time</li>
                <li>Answer each question</li>
                <li>Review your answers before submitting</li>
              </ul>
              <p className="text-foreground">
                <strong>5.</strong> Click <span className="bg-primary/20 px-2 py-1 rounded">Submit Test</span> when complete
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Understanding Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 4: Review Your Performance Analytics</CardTitle>
            <CardDescription>Track your progress and identify improvement areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">After completing tests, access detailed analytics:</p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Overall Statistics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Total Tests Completed</li>
                  <li>• Average Score</li>
                  <li>• Overall Accuracy Percentage</li>
                  <li>• Best & Worst Scores</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Category Performance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Accuracy by subject (Quant, Verbal, etc.)</li>
                  <li>• Identify weak categories</li>
                  <li>• Track improvement over time</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Getting Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 5: Use Adaptive Recommendations</CardTitle>
            <CardDescription>Get personalized study guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-foreground">
                The system analyzes your performance and provides smart recommendations:
              </p>
              <ul className="list-disc pl-8 text-muted-foreground space-y-2">
                <li><strong>High Priority</strong> - Focus areas where you scored below 60%</li>
                <li><strong>Medium Priority</strong> - Areas needing practice (60-75% accuracy)</li>
                <li><strong>Low Priority</strong> - Strong areas for revision only (75%+ accuracy)</li>
              </ul>
              <p className="text-foreground">
                Access recommendations from the <span className="bg-primary/20 px-2 py-1 rounded">Recommendations</span> page in the sidebar.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 6: Creating Study Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 6: Create a Study Plan</CardTitle>
            <CardDescription>Organize your preparation timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-foreground">
                <strong>1.</strong> Go to <span className="bg-primary/20 px-2 py-1 rounded">Study Plans</span> in the sidebar
              </p>
              <p className="text-foreground">
                <strong>2.</strong> Click <span className="bg-primary/20 px-2 py-1 rounded">Create New Plan</span>
              </p>
              <p className="text-foreground">
                <strong>3.</strong> Fill in the details:
              </p>
              <ul className="list-disc pl-8 text-muted-foreground space-y-1">
                <li>Plan Title (e.g., "3-Month CAT Prep")</li>
                <li>Description (goals and focus areas)</li>
                <li>Start and End Dates</li>
                <li>Focus Areas (Quantitative, Verbal, etc.)</li>
              </ul>
              <p className="text-foreground">
                <strong>4.</strong> Track your progress as you complete tests and recommendations
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 7: Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Step 7: Enable Email Notifications</CardTitle>
            <CardDescription>Stay motivated with regular updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">Set up automated notifications to keep you on track:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Daily Reminders</h4>
                <p className="text-sm text-muted-foreground">7:00 AM - Push to practice</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Weekly Reports</h4>
                <p className="text-sm text-muted-foreground">Sunday 9 AM - Week summary</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">Monthly Analysis</h4>
                <p className="text-sm text-muted-foreground">1st day - Progress report</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pro Tips for Success</CardTitle>
            <CardDescription>Maximize your CAT preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-foreground">
                <strong>1. Consistency is Key</strong> - Take tests regularly (3-4 times per week) to build stamina
              </li>
              <li className="text-foreground">
                <strong>2. Focus on Weak Areas</strong> - Use analytics to identify and practice problem categories
              </li>
              <li className="text-foreground">
                <strong>3. Track Time Management</strong> - Monitor time spent per question to improve speed
              </li>
              <li className="text-foreground">
                <strong>4. Follow Recommendations</strong> - Personalized suggestions are tailored to your needs
              </li>
              <li className="text-foreground">
                <strong>5. Set Realistic Goals</strong> - Create study plans with achievable milestones
              </li>
              <li className="text-foreground">
                <strong>6. Review Results</strong> - Analyze each test to understand mistakes and improve
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">How long does a practice test take?</h4>
              <p className="text-muted-foreground">Most tests have a 180-minute (3-hour) time limit, matching the actual CAT format.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Can I retake tests?</h4>
              <p className="text-muted-foreground">Yes! Each test can be attempted multiple times. Your best attempts and trends are tracked for comparison.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">How are recommendations generated?</h4>
              <p className="text-muted-foreground">The system analyzes your performance across categories and creates priority-based suggestions for improvement.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Can I disable email notifications?</h4>
              <p className="text-muted-foreground">Yes, you can customize notification preferences in your account settings.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Is my data secure?</h4>
              <p className="text-muted-foreground">All your data is encrypted and securely stored in our database. Passwords are hashed using bcryptjs.</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex gap-4 py-8">
          <Button size="lg" asChild>
            <Link href="/register">Create Account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Already Have an Account?</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
