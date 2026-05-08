import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function getUserId(request: NextRequest): Promise<number | null> {
  try {
    // Try from request cookies first
    const userId = request.cookies.get('user_id')?.value
    if (userId) {
      console.log('[v0] Found user_id in request cookies:', userId)
      return parseInt(userId)
    }

    // Try from headers (next/headers cookies)
    const cookieStore = await cookies()
    const userIdFromHeader = cookieStore.get('user_id')?.value
    if (userIdFromHeader) {
      console.log('[v0] Found user_id in header cookies:', userIdFromHeader)
      return parseInt(userIdFromHeader)
    }

    console.log('[v0] No user_id found in cookies')
    return null
  } catch (err) {
    console.error('[v0] Error getting user ID:', err)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request)

    if (!userId) {
      console.log('[v0] Auth check failed: no user_id')
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const users = await sql`SELECT id, email, full_name FROM users WHERE id = ${userId}`

    if (users.length === 0) {
      console.log('[v0] Auth check failed: user not found for id', userId)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('[v0] Auth check successful for user:', userId)
    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error('[v0] Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
