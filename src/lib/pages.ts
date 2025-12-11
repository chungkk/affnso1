import dbConnect from './db'
import LandingPage, { LandingPageDocument } from '@/models/LandingPage'
import { ILandingPage } from '@/types'

export async function getPageBySlug(slug: string): Promise<ILandingPage | null> {
  await dbConnect()
  
  const page = await LandingPage.findOne({ slug, isActive: true }).lean()
  
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
}

export async function getAllPages(): Promise<ILandingPage[]> {
  await dbConnect()
  
  const pages = await LandingPage.find().sort({ createdAt: -1 }).lean()
  
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

export async function getActivePages(): Promise<ILandingPage[]> {
  await dbConnect()
  
  const pages = await LandingPage.find({ isActive: true }).sort({ createdAt: -1 }).lean()
  
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

export async function getPageById(id: string): Promise<ILandingPage | null> {
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
}
