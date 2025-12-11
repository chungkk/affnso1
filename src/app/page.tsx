export const dynamic = 'force-dynamic'

import dbConnect from '@/lib/db'
import HomepageConfig from '@/models/HomepageConfig'
import HomepageTemplate from '@/components/homepage/HomepageTemplate'
import { IHomepageConfig } from '@/types'

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

async function getHomepageConfig(): Promise<IHomepageConfig> {
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

  return {
    _id: config!._id,
    selectedTheme: config!.selectedTheme,
    services: config!.services,
    createdAt: config!.createdAt,
    updatedAt: config!.updatedAt,
  } as IHomepageConfig
}

export default async function Home() {
  const config = await getHomepageConfig()

  return <HomepageTemplate config={config} />
}
