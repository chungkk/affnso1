import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'
import { ApiResponse, ILandingPage } from '@/types'
import { validateLandingPage } from '@/lib/validation'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ILandingPage>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await dbConnect()

    const page = await LandingPage.findById(id).lean()
    if (!page) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: page._id.toString(),
        slug: page.slug,
        title: page.title,
        description: page.description,
        affiliateLink: page.affiliateLink,
        templateId: page.templateId,
        isActive: page.isActive,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      },
    })
  } catch (error) {
    console.error('Get page error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ILandingPage>>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const validation = validateLandingPage(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', data: validation.errors as unknown as ILandingPage },
        { status: 400 }
      )
    }

    await dbConnect()

    const existingPage = await LandingPage.findById(id)
    if (!existingPage) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 })
    }

    if (body.slug !== existingPage.slug) {
      const slugExists = await LandingPage.findOne({ slug: body.slug, _id: { $ne: id } })
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'A page with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updatedPage = await LandingPage.findByIdAndUpdate(
      id,
      {
        slug: body.slug.toLowerCase().trim(),
        title: body.title.trim(),
        description: body.description.trim(),
        affiliateLink: body.affiliateLink.trim(),
        templateId: body.templateId ?? existingPage.templateId,
        isActive: body.isActive ?? existingPage.isActive,
      },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedPage) {
      return NextResponse.json({ success: false, error: 'Failed to update page' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: updatedPage._id.toString(),
        slug: updatedPage.slug,
        title: updatedPage.title,
        description: updatedPage.description,
        affiliateLink: updatedPage.affiliateLink,
        templateId: updatedPage.templateId,
        isActive: updatedPage.isActive,
        createdAt: updatedPage.createdAt,
        updatedAt: updatedPage.updatedAt,
      },
      message: 'Page updated successfully',
    })
  } catch (error) {
    console.error('Update page error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse>> {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await dbConnect()

    const deletedPage = await LandingPage.findByIdAndDelete(id)
    if (!deletedPage) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Page deleted successfully' })
  } catch (error) {
    console.error('Delete page error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
