import { sql } from '@/lib/db'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      )
    }

    // Find user
    const users = await sql`SELECT id, email, full_name, password_hash FROM users WHERE email = ${email}`

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const user = users[0]

    // Verify password
    const passwordMatch = await bcryptjs.compare(password, user.password_hash)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Set session cookie
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
        },
      },
      { status: 200 }
    )

    response.cookies.set('user_id', String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Login failed'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
