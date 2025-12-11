import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Admin from '@/models/Admin'
import bcrypt from 'bcryptjs'
import { ApiResponse } from '@/types'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: MAX_REQUESTS - record.count }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed, remaining } = getRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: { 'X-RateLimit-Remaining': '0' }
      }
    )
  }

  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    if (typeof username !== 'string' || username.length < 3 || username.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Invalid username' },
        { status: 400, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 400, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    await dbConnect()

    const admin = await Admin.findOne({ username })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    if (admin.isLocked()) {
      return NextResponse.json(
        { success: false, error: 'Account is locked. Please try again later.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash)

    if (!isValid) {
      await admin.incrementFailedAttempts()
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      )
    }

    await admin.resetFailedAttempts()

    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
