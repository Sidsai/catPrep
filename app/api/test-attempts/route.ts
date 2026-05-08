import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

function getUserId(request: NextRequest): number | null {
  const userId = request.cookies.get('user_id')?.value
  return userId ? parseInt(userId) : null
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request)

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const {
      practice_test_id,
      score,
      time_spent_minutes,
      accuracy_percentage,
      questions_data,
    } = await request.json()

    // Create test attempt
    const attemptResult = await sql`
      INSERT INTO test_attempts (
        user_id,
        practice_test_id,
        score,
        time_spent_minutes,
        accuracy_percentage,
        completed_at
      )
      VALUES (
        ${userId},
        ${practice_test_id},
        ${score},
        ${time_spent_minutes},
        ${accuracy_percentage},
        NOW()
      )
      RETURNING *
    `

    const attempt = attemptResult[0]

    // Insert question performance data
    if (questions_data && Array.isArray(questions_data)) {
      for (const q of questions_data) {
        await sql`
          INSERT INTO question_performance (
            user_id,
            test_attempt_id,
            question_id,
            category,
            difficulty,
            is_correct,
            time_spent_seconds
          )
          VALUES (
            ${userId},
            ${attempt.id},
            ${q.question_id},
            ${q.category},
            ${q.difficulty},
            ${q.is_correct},
            ${q.time_spent_seconds}
          )
        `
      }
    }

    return NextResponse.json(attempt, { status: 201 })
  } catch (error) {
    console.error('[v0] Error submitting test attempt:', error)
    return NextResponse.json(
      { error: 'Failed to submit test attempt' },
      { status: 500 }
    )
  }
}
