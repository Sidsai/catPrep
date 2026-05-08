import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL || '');

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plans = await sql`
      SELECT * FROM study_plans 
      WHERE user_id = ${parseInt(userId)} 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Failed to fetch study plans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, focus_areas, start_date, end_date } = await request.json();

    const result = await sql`
      INSERT INTO study_plans (user_id, title, description, focus_areas, start_date, end_date, status)
      VALUES (${parseInt(userId)}, ${title}, ${description}, ${focus_areas}, ${start_date}, ${end_date}, 'active')
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Failed to create study plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
