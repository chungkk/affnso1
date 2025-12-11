import mongoose, { Schema, Document, Model } from 'mongoose'
import { ILandingPage } from '@/types'

export interface LandingPageDocument extends Omit<ILandingPage, '_id'>, Document {}

const LandingPageSchema = new Schema<LandingPageDocument>(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]{3,50}$/, 'Slug must be 3-50 characters, lowercase letters, numbers, and hyphens only'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    affiliateLink: {
      type: String,
      required: [true, 'Affiliate link is required'],
      validate: {
        validator: (v: string) => /^https?:\/\/.+/.test(v),
        message: 'Invalid URL format',
      },
    },
    templateId: {
      type: Number,
      required: true,
      min: [1, 'Template ID must be between 1 and 10'],
      max: [10, 'Template ID must be between 1 and 10'],
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

LandingPageSchema.index({ slug: 1 }, { unique: true })
LandingPageSchema.index({ isActive: 1 })

const LandingPage: Model<LandingPageDocument> =
  mongoose.models.LandingPage || mongoose.model<LandingPageDocument>('LandingPage', LandingPageSchema)

export default LandingPage
