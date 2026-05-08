import { sql } from '@/lib/db'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json()

    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const password_hash = await bcryptjs.hash(password, salt)

    // Create user
    const result = await sql`
      INSERT INTO users (email, password_hash, full_name)
      VALUES (${email}, ${password_hash}, ${full_name})
      RETURNING id, email, full_name, created_at
    `

    const user = result[0]

    // Create default preferences
    await sql`
      INSERT INTO user_preferences (user_id)
      VALUES (${user.id})
    `

    // Set session cookie
    const response = NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
        },
      },
      { status: 201 }
    )

    response.cookies.set('user_id', String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error('[v0] Registration error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Registration failed'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
