import mongoose, { Schema, Model } from 'mongoose'
import { IHomepageConfig, IService } from '@/types'

export interface HomepageConfigDocument extends IHomepageConfig {
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema<IService>(
  {
    id: {
      type: String,
      required: [true, 'Service ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Service name is required'],
      maxlength: [50, 'Service name cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      maxlength: [200, 'Service description cannot exceed 200 characters'],
    },
    affiliateLink: {
      type: String,
      default: '',
      validate: {
        validator: (v: string) => v === '' || /^https?:\/\/.+/.test(v),
        message: 'Invalid URL format. Must be empty or start with http:// or https://',
      },
    },
    icon: {
      type: String,
      required: [true, 'Service icon is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
)

const HomepageConfigSchema = new Schema<HomepageConfigDocument>(
  {
    _id: {
      type: String,
      default: 'homepage',
    },
    selectedTheme: {
      type: Number,
      required: true,
      min: [1, 'Theme ID must be between 1 and 10'],
      max: [10, 'Theme ID must be between 1 and 10'],
      default: 1,
    },
    services: {
      type: [ServiceSchema],
      required: true,
      validate: {
        validator: (v: IService[]) => v.length >= 1,
        message: 'At least one service is required',
      },
    },
  },
  { timestamps: true }
)

const HomepageConfig: Model<HomepageConfigDocument> =
  mongoose.models.HomepageConfig || mongoose.model<HomepageConfigDocument>('HomepageConfig', HomepageConfigSchema)

export default HomepageConfig
