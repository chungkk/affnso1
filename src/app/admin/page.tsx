export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'
import PageStatistic from '@/models/PageStatistic'
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/common/Card'
import Link from 'next/link'

async function getDashboardStats() {
  await dbConnect()
  
  const totalPages = await LandingPage.countDocuments()
  const activePages = await LandingPage.countDocuments({ isActive: true })
  const inactivePages = totalPages - activePages
  
  const recentPages = await LandingPage.find()
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean()

  // Get tracking stats
  const allStats = await PageStatistic.find().lean()
  const totalViews = allStats.reduce((sum, s) => sum + s.pageViews, 0)
  const totalClicks = allStats.reduce((sum, s) => sum + s.affiliateClicks, 0)

  return {
    totalPages,
    activePages,
    inactivePages,
    totalViews,
    totalClicks,
    recentPages: recentPages.map(page => ({
      _id: page._id.toString(),
      slug: page.slug,
      title: page.title,
      isActive: page.isActive,
      updatedAt: page.updatedAt,
    })),
  }
}

export default async function AdminDashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your affiliate landing pages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">{stats.totalPages}</p>
              <p className="text-sm text-gray-500 mt-1">Total Pages</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.activePages}</p>
              <p className="text-sm text-gray-500 mt-1">Active Pages</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-400">{stats.inactivePages}</p>
              <p className="text-sm text-gray-500 mt-1">Inactive Pages</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Total Views</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.totalClicks.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Total Clicks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Pages</CardTitle>
          <CardDescription>Your most recently updated landing pages</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentPages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No pages yet</p>
              <Link 
                href="/admin/pages/new" 
                className="mt-2 inline-block text-primary-600 hover:text-primary-700"
              >
                Create your first page
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.recentPages.map((page) => (
                <div key={page._id} className="py-3 flex items-center justify-between">
                  <div>
                    <Link 
                      href={`/admin/pages/${page._id}/edit`}
                      className="font-medium text-gray-900 hover:text-primary-600"
                    >
                      {page.title}
                    </Link>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      page.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <Link 
                      href={`/admin/pages/${page._id}/edit`}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Link 
          href="/admin/pages"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          View All Pages
        </Link>
        <Link 
          href="/admin/pages/new"
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          Create New Page
        </Link>
      </div>
    </div>
  )
}
