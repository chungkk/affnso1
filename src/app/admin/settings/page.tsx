export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db'
import HomepageConfig from '@/models/HomepageConfig'
import HomepageSettingsForm from '@/components/admin/HomepageSettingsForm'
import ThemeSelector from '@/components/admin/ThemeSelector'
import { IHomepageConfig } from '@/types'

async function getHomepageConfig(): Promise<IHomepageConfig | null> {
  await dbConnect()
  const config = await HomepageConfig.findById('homepage').lean()
  
  if (!config) return null
  
  return {
    _id: config._id,
    selectedTheme: config.selectedTheme,
    services: config.services,
    createdAt: config.createdAt,
    updatedAt: config.updatedAt,
  } as IHomepageConfig
}

export default async function AdminSettingsPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const config = await getHomepageConfig()

  if (!config) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Homepage configuration not found. Please run the seed script first.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Homepage Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your homepage affiliate links and theme
        </p>
      </div>

      <div className="grid gap-6">
        <HomepageSettingsForm initialConfig={config} />
        <ThemeSelector initialTheme={config.selectedTheme} />
      </div>
    </div>
  )
}
