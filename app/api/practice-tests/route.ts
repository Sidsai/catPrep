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

    const tests = await sql`
      SELECT * FROM practice_tests
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `

    return NextResponse.json(tests)
  } catch (error) {
    console.error('[v0] Error fetching practice tests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch practice tests' },
      { status: 500 }
    )
  }
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

    const { title, description, total_questions, time_limit_minutes, difficulty_level } =
      await request.json()

    const result = await sql`
      INSERT INTO practice_tests (user_id, title, description, total_questions, time_limit_minutes, difficulty_level)
      VALUES (${userId}, ${title}, ${description}, ${total_questions || 100}, ${time_limit_minutes || 180}, ${difficulty_level})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating practice test:', error)
    return NextResponse.json(
      { error: 'Failed to create practice test' },
      { status: 500 }
    )
  }
}
