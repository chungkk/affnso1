import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { IPageStatistic } from '@/types'

export interface PageStatisticDocument extends Omit<IPageStatistic, '_id' | 'pageId'>, Document {
  pageId: Types.ObjectId
}

const PageStatisticSchema = new Schema<PageStatisticDocument>(
  {
    pageId: {
      type: Schema.Types.ObjectId,
      ref: 'LandingPage',
      required: [true, 'Page ID is required'],
      unique: true,
    },
    pageViews: {
      type: Number,
      default: 0,
      min: [0, 'Page views cannot be negative'],
    },
    affiliateClicks: {
      type: Number,
      default: 0,
      min: [0, 'Affiliate clicks cannot be negative'],
    },
  },
  { timestamps: true }
)

PageStatisticSchema.index({ pageId: 1 }, { unique: true })

PageStatisticSchema.statics.incrementPageViews = async function (pageId: Types.ObjectId) {
  return this.findOneAndUpdate(
    { pageId },
    { $inc: { pageViews: 1 } },
    { upsert: true, new: true }
  )
}

PageStatisticSchema.statics.incrementAffiliateClicks = async function (pageId: Types.ObjectId) {
  return this.findOneAndUpdate(
    { pageId },
    { $inc: { affiliateClicks: 1 } },
    { upsert: true, new: true }
  )
}

const PageStatistic: Model<PageStatisticDocument> =
  mongoose.models.PageStatistic || mongoose.model<PageStatisticDocument>('PageStatistic', PageStatisticSchema)

export default PageStatistic
