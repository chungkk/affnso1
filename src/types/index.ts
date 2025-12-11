import { ObjectId } from 'mongoose'

export interface ILandingPage {
  _id?: ObjectId | string
  slug: string
  title: string
  description: string
  affiliateLink: string
  templateId: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IAdmin {
  _id?: ObjectId | string
  username: string
  passwordHash: string
  failedLoginAttempts: number
  lockedUntil: Date | null
  lastLoginAt: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export interface IPageStatistic {
  _id?: ObjectId | string
  pageId: ObjectId | string
  pageViews: number
  affiliateClicks: number
  updatedAt?: Date
}

export interface LandingPageInput {
  slug: string
  title: string
  description: string
  affiliateLink: string
  templateId?: number
  isActive?: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PageStatisticWithPage extends IPageStatistic {
  slug: string
  title: string
  clickRate: number
}

export interface StatsResponse {
  stats: PageStatisticWithPage[]
  totals: {
    pageViews: number
    affiliateClicks: number
  }
}

export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface TemplateProps {
  page: ILandingPage
  onCtaClick?: () => void
}

export interface IService {
  id: string
  name: string
  description: string
  affiliateLink: string
  icon: string
  isActive: boolean
  order: number
}

export interface IHomepageConfig {
  _id: string
  selectedTheme: TemplateId
  services: IService[]
  createdAt?: Date
  updatedAt?: Date
}

export interface HomepageConfigInput {
  selectedTheme?: TemplateId
  services?: Partial<IService>[]
}

export interface HomepageTemplateProps {
  config: IHomepageConfig
  onCtaClick?: (serviceId: string) => void
}
