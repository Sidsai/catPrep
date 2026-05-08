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

    const recommendations = await sql`
      SELECT * FROM adaptive_recommendations
      WHERE user_id = ${userId}
      ORDER BY priority DESC, created_at DESC
      LIMIT 20
    `

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error('[v0] Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
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

    const { category, recommendation_type, description, priority } =
      await request.json()

    const result = await sql`
      INSERT INTO adaptive_recommendations (user_id, category, recommendation_type, description, priority)
      VALUES (${userId}, ${category}, ${recommendation_type}, ${description}, ${priority || 5})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating recommendation:', error)
    return NextResponse.json(
      { error: 'Failed to create recommendation' },
      { status: 500 }
    )
  }
}
