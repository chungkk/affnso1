import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db'
import HomepageConfig from '@/models/HomepageConfig'
import { ApiResponse, IHomepageConfig, HomepageConfigInput } from '@/types'

export async function GET(): Promise<NextResponse<ApiResponse<IHomepageConfig>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()

    const config = await HomepageConfig.findById('homepage').lean()

    if (!config) {
      return NextResponse.json({ success: false, error: 'Homepage config not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: config._id,
        selectedTheme: config.selectedTheme,
        services: config.services.sort((a, b) => a.order - b.order),
        createdAt: config.createdAt,
        updatedAt: config.updatedAt,
      } as IHomepageConfig,
    })
  } catch (error) {
    console.error('Admin get homepage config error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest
): Promise<NextResponse<ApiResponse<IHomepageConfig>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: HomepageConfigInput = await request.json()

    if (body.selectedTheme !== undefined) {
      if (body.selectedTheme < 1 || body.selectedTheme > 10) {
        return NextResponse.json(
          { success: false, error: 'Theme must be between 1 and 10' },
          { status: 400 }
        )
      }
    }

    if (body.services) {
      for (const service of body.services) {
        if (service.affiliateLink && !/^https?:\/\/.+/.test(service.affiliateLink)) {
          return NextResponse.json(
            { success: false, error: `Invalid URL format for service: ${service.id}` },
            { status: 400 }
          )
        }
      }
    }

    await dbConnect()

    const config = await HomepageConfig.findById('homepage')
    if (!config) {
      return NextResponse.json({ success: false, error: 'Homepage config not found' }, { status: 404 })
    }

    if (body.selectedTheme !== undefined) {
      config.selectedTheme = body.selectedTheme
    }

    if (body.services) {
      for (const serviceUpdate of body.services) {
        const existingService = config.services.find(s => s.id === serviceUpdate.id)
        if (existingService) {
          if (serviceUpdate.affiliateLink !== undefined) {
            existingService.affiliateLink = serviceUpdate.affiliateLink
          }
          if (serviceUpdate.isActive !== undefined) {
            existingService.isActive = serviceUpdate.isActive
          }
        }
      }
    }

    await config.save()

    const updatedConfig = await HomepageConfig.findById('homepage').lean()

    return NextResponse.json({
      success: true,
      data: {
        _id: updatedConfig!._id,
        selectedTheme: updatedConfig!.selectedTheme,
        services: updatedConfig!.services.sort((a, b) => a.order - b.order),
        createdAt: updatedConfig!.createdAt,
        updatedAt: updatedConfig!.updatedAt,
      } as IHomepageConfig,
      message: 'Homepage config updated successfully',
    })
  } catch (error) {
    console.error('Admin update homepage config error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
