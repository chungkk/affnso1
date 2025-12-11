import { NextRequest, NextResponse } from 'next/server'
import { trackPageView } from '@/lib/tracking'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { ApiResponse } from '@/types'

const RATE_LIMIT_CONFIG = { windowMs: 60 * 1000, maxRequests: 100 }

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`track-view:${ip}`, RATE_LIMIT_CONFIG)

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetTime),
        }
      }
    )
  }

  try {
    const body = await request.json()
    const { slug } = body

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    const result = await trackPageView(slug)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'View tracked' },
      { headers: { 'X-RateLimit-Remaining': String(rateLimit.remaining) } }
    )
  } catch (error) {
    console.error('Track view error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
