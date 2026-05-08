import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

function getUserId(request: NextRequest): number | null {
  const userId = request.cookies.get('user_id')?.value
  return userId ? parseInt(userId) : null
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request)

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get overall performance stats
    const stats = await sql`
      SELECT
        COUNT(*) as total_tests,
        AVG(score) as average_score,
        AVG(accuracy_percentage) as average_accuracy,
        AVG(time_spent_minutes) as average_time,
        MAX(score) as best_score,
        MIN(score) as worst_score
      FROM test_attempts
      WHERE user_id = ${userId}
    `

    // Get category-wise performance
    const categoryPerf = await sql`
      SELECT
        category,
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_count,
        ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as accuracy
      FROM question_performance
      WHERE user_id = ${userId}
      GROUP BY category
      ORDER BY accuracy DESC
    `

    // Get recent test attempts
    const recentTests = await sql`
      SELECT
        id,
        score,
        accuracy_percentage,
        time_spent_minutes,
        completed_at
      FROM test_attempts
      WHERE user_id = ${userId}
      ORDER BY completed_at DESC
      LIMIT 10
    `

    return NextResponse.json({
      overall_stats: stats[0],
      category_performance: categoryPerf,
      recent_tests: recentTests,
    })
  } catch (error) {
    console.error('[v0] Error fetching performance analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance analytics' },
      { status: 500 }
    )
  }
}
