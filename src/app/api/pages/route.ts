import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'
import { ApiResponse, ILandingPage } from '@/types'
import { validateLandingPage } from '@/lib/validation'

interface PagesListResponse {
  pages: ILandingPage[]
  total: number
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<PagesListResponse>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const activeFilter = searchParams.get('active')

    const query: Record<string, boolean> = {}
    if (activeFilter === 'true') {
      query.isActive = true
    } else if (activeFilter === 'false') {
      query.isActive = false
    }

    const pages = await LandingPage.find(query).sort({ updatedAt: -1 }).lean()
    const total = await LandingPage.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: {
        pages: pages.map((page) => ({
          _id: page._id.toString(),
          slug: page.slug,
          title: page.title,
          description: page.description,
          affiliateLink: page.affiliateLink,
          templateId: page.templateId,
          isActive: page.isActive,
          createdAt: page.createdAt,
          updatedAt: page.updatedAt,
        })),
        total,
      },
    })
  } catch (error) {
    console.error('List pages error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ILandingPage>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const validation = validateLandingPage(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', data: validation.errors as unknown as ILandingPage },
        { status: 400 }
      )
    }

    await dbConnect()

    const existingPage = await LandingPage.findOne({ slug: body.slug.toLowerCase().trim() })
    if (existingPage) {
      return NextResponse.json(
        { success: false, error: 'A page with this slug already exists' },
        { status: 409 }
      )
    }

    const newPage = await LandingPage.create({
      slug: body.slug.toLowerCase().trim(),
      title: body.title.trim(),
      description: body.description.trim(),
      affiliateLink: body.affiliateLink.trim(),
      templateId: body.templateId ?? 1,
      isActive: body.isActive ?? true,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: newPage._id.toString(),
          slug: newPage.slug,
          title: newPage.title,
          description: newPage.description,
          affiliateLink: newPage.affiliateLink,
          templateId: newPage.templateId,
          isActive: newPage.isActive,
          createdAt: newPage.createdAt,
          updatedAt: newPage.updatedAt,
        },
        message: 'Page created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create page error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
