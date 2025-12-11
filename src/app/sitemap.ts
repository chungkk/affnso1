import { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  await dbConnect()

  const pages = await LandingPage.find({ isActive: true }).lean()

  const landingPages: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt || page.createdAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...landingPages,
  ]
}
