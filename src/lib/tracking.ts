import dbConnect from '@/lib/db'
import LandingPage from '@/models/LandingPage'
import PageStatistic from '@/models/PageStatistic'
import { Types } from 'mongoose'

export interface TrackingResult {
  success: boolean
  error?: string
  affiliateLink?: string
}

export async function trackPageView(slug: string): Promise<TrackingResult> {
  try {
    await dbConnect()

    const page = await LandingPage.findOne({ slug: slug.toLowerCase(), isActive: true })
    if (!page) {
      return { success: false, error: 'Page not found' }
    }

    await PageStatistic.findOneAndUpdate(
      { pageId: page._id },
      { $inc: { pageViews: 1 } },
      { upsert: true, new: true }
    )

    return { success: true }
  } catch (error) {
    console.error('Track page view error:', error)
    return { success: false, error: 'Failed to track page view' }
  }
}

export async function trackAffiliateClick(slug: string): Promise<TrackingResult> {
  try {
    await dbConnect()

    const page = await LandingPage.findOne({ slug: slug.toLowerCase(), isActive: true })
    if (!page) {
      return { success: false, error: 'Page not found' }
    }

    await PageStatistic.findOneAndUpdate(
      { pageId: page._id },
      { $inc: { affiliateClicks: 1 } },
      { upsert: true, new: true }
    )

    return { success: true, affiliateLink: page.affiliateLink }
  } catch (error) {
    console.error('Track affiliate click error:', error)
    return { success: false, error: 'Failed to track click' }
  }
}

export interface PageStats {
  _id: string
  pageId: string
  slug: string
  title: string
  pageViews: number
  affiliateClicks: number
  clickRate: number
  updatedAt?: Date
}

export interface StatsOverview {
  stats: PageStats[]
  totals: {
    pageViews: number
    affiliateClicks: number
    avgClickRate: number
  }
}

export async function getStatsOverview(): Promise<StatsOverview> {
  await dbConnect()

  const pages = await LandingPage.find().lean()
  const statistics = await PageStatistic.find().lean()

  const statsMap = new Map(
    statistics.map((stat) => [stat.pageId.toString(), stat])
  )

  const stats: PageStats[] = pages.map((page) => {
    const pageStat = statsMap.get(page._id.toString())
    const pageViews = pageStat?.pageViews || 0
    const affiliateClicks = pageStat?.affiliateClicks || 0
    const clickRate = pageViews > 0 ? (affiliateClicks / pageViews) * 100 : 0

    return {
      _id: pageStat?._id?.toString() || '',
      pageId: page._id.toString(),
      slug: page.slug,
      title: page.title,
      pageViews,
      affiliateClicks,
      clickRate: Math.round(clickRate * 100) / 100,
      updatedAt: pageStat?.updatedAt,
    }
  })

  const totals = stats.reduce(
    (acc, stat) => ({
      pageViews: acc.pageViews + stat.pageViews,
      affiliateClicks: acc.affiliateClicks + stat.affiliateClicks,
    }),
    { pageViews: 0, affiliateClicks: 0 }
  )

  const avgClickRate =
    totals.pageViews > 0 ? (totals.affiliateClicks / totals.pageViews) * 100 : 0

  return {
    stats: stats.sort((a, b) => b.pageViews - a.pageViews),
    totals: {
      ...totals,
      avgClickRate: Math.round(avgClickRate * 100) / 100,
    },
  }
}

export async function getPageStats(pageId: string): Promise<PageStats | null> {
  await dbConnect()

  if (!Types.ObjectId.isValid(pageId)) {
    return null
  }

  const page = await LandingPage.findById(pageId).lean()
  if (!page) {
    return null
  }

  const stat = await PageStatistic.findOne({ pageId: new Types.ObjectId(pageId) }).lean()
  const pageViews = stat?.pageViews || 0
  const affiliateClicks = stat?.affiliateClicks || 0
  const clickRate = pageViews > 0 ? (affiliateClicks / pageViews) * 100 : 0

  return {
    _id: stat?._id?.toString() || '',
    pageId: page._id.toString(),
    slug: page.slug,
    title: page.title,
    pageViews,
    affiliateClicks,
    clickRate: Math.round(clickRate * 100) / 100,
    updatedAt: stat?.updatedAt,
  }
}
