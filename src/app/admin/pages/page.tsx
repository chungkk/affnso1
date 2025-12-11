export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'
import PagesList from '@/components/admin/PagesList'
import Button from '@/components/common/Button'
import { ILandingPage } from '@/types'

async function getPages(): Promise<ILandingPage[]> {
  await dbConnect()
  const pages = await LandingPage.find().sort({ updatedAt: -1 }).lean()
  return pages.map((page) => ({
    _id: page._id.toString(),
    slug: page.slug,
    title: page.title,
    description: page.description,
    affiliateLink: page.affiliateLink,
    templateId: page.templateId,
    isActive: page.isActive,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  }))
}

export default async function PagesListPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  const pages = await getPages()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your affiliate landing pages
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button>Create New Page</Button>
        </Link>
      </div>

      <PagesList pages={pages} />
    </div>
  )
}
