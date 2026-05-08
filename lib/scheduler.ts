import cron from 'node-cron'
import { sql } from '@/lib/db'
import {
  sendDailyReminder,
  sendWeeklyReport,
  sendMonthlyAnalysis,
} from './email'

let schedulerInitialized = false

export function initializeScheduler() {
  if (schedulerInitialized) return
  schedulerInitialized = true

  console.log('[v0] Initializing CAT Prep Tracker scheduler...')

  // Daily reminder at 7 AM
  cron.schedule('0 7 * * *', async () => {
    console.log('[v0] Running daily reminder job...')
    try {
      const users = await sql`
        SELECT u.id, u.email, u.full_name
        FROM users u
        JOIN user_preferences up ON u.id = up.user_id
        WHERE up.daily_reminder_enabled = true
      `

      for (const user of users) {
        try {
          await sendDailyReminder(user.email, user.full_name)
          console.log(
            `[v0] Daily reminder sent to ${user.email}`
          )
        } catch (error) {
          console.error(
            `[v0] Failed to send reminder to ${user.email}:`,
            error
          )
        }
      }
    } catch (error) {
      console.error('[v0] Daily reminder job error:', error)
    }
  })

  // Weekly report on Sunday at 9 AM
  cron.schedule('0 9 * * 0', async () => {
    console.log('[v0] Running weekly report job...')
    try {
      const users = await sql`
        SELECT u.id, u.email, u.full_name
        FROM users u
        JOIN user_preferences up ON u.id = up.user_id
        WHERE up.weekly_report_enabled = true
      `

      for (const user of users) {
        try {
          const stats = await sql`
            SELECT
              COUNT(*) as tests_taken,
              AVG(score) as average_score,
              AVG(accuracy_percentage) as average_accuracy,
              SUM(time_spent_minutes) as total_time_minutes
            FROM test_attempts
            WHERE user_id = ${user.id}
            AND completed_at > NOW() - INTERVAL '7 days'
          `

          await sendWeeklyReport(user.email, user.full_name, stats[0] || {})
          console.log(
            `[v0] Weekly report sent to ${user.email}`
          )
        } catch (error) {
          console.error(
            `[v0] Failed to send weekly report to ${user.email}:`,
            error
          )
        }
      }
    } catch (error) {
      console.error('[v0] Weekly report job error:', error)
    }
  })

  // Monthly analysis on the 1st at 10 AM
  cron.schedule('0 10 1 * *', async () => {
    console.log('[v0] Running monthly analysis job...')
    try {
      const users = await sql`
        SELECT u.id, u.email, u.full_name
        FROM users u
        JOIN user_preferences up ON u.id = up.user_id
        WHERE up.monthly_analysis_enabled = true
      `

      for (const user of users) {
        try {
          const overallStats = await sql`
            SELECT
              COUNT(*) as total_tests,
              AVG(score) as average_score,
              MAX(score) as best_score,
              MIN(score) as worst_score
            FROM test_attempts
            WHERE user_id = ${user.id}
            AND completed_at > NOW() - INTERVAL '30 days'
          `

          const categoryStats = await sql`
            SELECT
              category,
              ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as accuracy
            FROM question_performance
            WHERE user_id = ${user.id}
            AND created_at > NOW() - INTERVAL '30 days'
            GROUP BY category
            ORDER BY accuracy DESC
          `

          const stats = overallStats[0] || {}
          const categories = categoryStats || []

          const improvement =
            stats.average_score && stats.worst_score
              ? ((stats.average_score - stats.worst_score) / stats.worst_score) * 100
              : 0

          const analysis = {
            total_tests: stats.total_tests || 0,
            best_score: stats.best_score || 0,
            average_score: stats.average_score || 0,
            improvement,
            strongest_area: categories[0]?.category || 'N/A',
            weakest_area: categories[categories.length - 1]?.category || 'N/A',
          }

          await sendMonthlyAnalysis(user.email, user.full_name, analysis)
          console.log(
            `[v0] Monthly analysis sent to ${user.email}`
          )
        } catch (error) {
          console.error(
            `[v0] Failed to send monthly analysis to ${user.email}:`,
            error
          )
        }
      }
    } catch (error) {
      console.error('[v0] Monthly analysis job error:', error)
    }
  })

  // Cleanup old logs every day at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('[v0] Running cleanup job...')
    try {
      // You can add any cleanup logic here
      console.log('[v0] Cleanup completed')
    } catch (error) {
      console.error('[v0] Cleanup job error:', error)
    }
  })

  console.log('[v0] Scheduler initialized successfully')
}
