export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'
import PageEditForm from '@/components/admin/PageEditForm'
import { ILandingPage } from '@/types'

interface EditPageProps {
  params: Promise<{ id: string }>
}

async function getPage(id: string): Promise<ILandingPage | null> {
  try {
    await dbConnect()
    const page = await LandingPage.findById(id).lean()
    if (!page) return null
    return {
      _id: page._id.toString(),
      slug: page.slug,
      title: page.title,
      description: page.description,
      affiliateLink: page.affiliateLink,
      templateId: page.templateId,
      isActive: page.isActive,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    }
  } catch {
    return null
  }
}

export default async function EditPagePage({ params }: EditPageProps) {
  const { id } = await params
  const page = await getPage(id)

  if (!page) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the configuration for your landing page
        </p>
      </div>
      <PageEditForm page={page} />
    </div>
  )
}
