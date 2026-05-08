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

    const plans = await sql`
      SELECT * FROM study_plans 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `

    return NextResponse.json(plans)
  } catch (error) {
    console.error('[v0] Error fetching study plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch study plans' },
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

    const { title, focus_areas, start_date, end_date, status } = await request.json()

    const result = await sql`
      INSERT INTO study_plans (user_id, title, focus_areas, start_date, end_date, status)
      VALUES (${userId}, ${title}, ${focus_areas}, ${start_date}, ${end_date}, ${status || 'active'})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating study plan:', error)
    return NextResponse.json(
      { error: 'Failed to create study plan' },
      { status: 500 }
    )
  }
}
