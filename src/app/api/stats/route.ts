import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getStatsOverview, StatsOverview } from '@/lib/tracking'
import { ApiResponse } from '@/types'

export async function GET(): Promise<NextResponse<ApiResponse<StatsOverview>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const overview = await getStatsOverview()

    return NextResponse.json({
      success: true,
      data: overview,
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
