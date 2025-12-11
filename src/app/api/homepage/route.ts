import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import HomepageConfig from '@/models/HomepageConfig'
import { ApiResponse, IHomepageConfig } from '@/types'

const DEFAULT_SERVICES = [
  {
    id: 'domain',
    name: 'Domain Registration',
    description: 'Register your perfect domain name at competitive prices',
    affiliateLink: '',
    icon: '🌐',
    isActive: true,
    order: 1,
  },
  {
    id: 'hosting',
    name: 'Web Hosting',
    description: 'Fast, reliable hosting with 99.9% uptime guarantee',
    affiliateLink: '',
    icon: '🚀',
    isActive: true,
    order: 2,
  },
  {
    id: 'ssl',
    name: 'SSL Certificates',
    description: 'Secure your website with industry-standard encryption',
    affiliateLink: '',
    icon: '🔒',
    isActive: true,
    order: 3,
  },
]

export async function GET(): Promise<NextResponse<ApiResponse<IHomepageConfig>>> {
  try {
    await dbConnect()

    let config = await HomepageConfig.findById('homepage').lean()

    if (!config) {
      await HomepageConfig.create({
        _id: 'homepage',
        selectedTheme: 1,
        services: DEFAULT_SERVICES,
      })
      config = await HomepageConfig.findById('homepage').lean()
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: config!._id,
        selectedTheme: config!.selectedTheme,
        services: config!.services.sort((a, b) => a.order - b.order),
        createdAt: config!.createdAt,
        updatedAt: config!.updatedAt,
      } as IHomepageConfig,
    })
  } catch (error) {
    console.error('Get homepage config error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
