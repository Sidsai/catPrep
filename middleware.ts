import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Log cookies for debugging
  const cookies = request.cookies.getAll()
  if (cookies.length > 0) {
    console.log('[v0] Middleware - Cookies received:', cookies.map(c => c.name))
  }

  return response
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}
