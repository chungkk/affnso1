import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import HomepageConfig from '@/models/HomepageConfig'
import PageStatistic from '@/models/PageStatistic'
import { ApiResponse } from '@/types'

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()
    const { serviceId } = body

    if (!serviceId || typeof serviceId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      )
    }

    await dbConnect()

    const config = await HomepageConfig.findById('homepage').lean()
    if (!config) {
      return NextResponse.json(
        { success: false, error: 'Homepage config not found' },
        { status: 404 }
      )
    }

    const service = config.services.find(s => s.id === serviceId)
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Invalid service ID' },
        { status: 400 }
      )
    }

    await PageStatistic.findOneAndUpdate(
      { pageId: `homepage-${serviceId}` },
      {
        $inc: { affiliateClicks: 1 },
        $setOnInsert: { pageViews: 0 },
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Click tracked successfully',
    })
  } catch (error) {
    console.error('Track homepage click error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
