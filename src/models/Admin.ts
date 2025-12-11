import mongoose, { Schema, Document, Model } from 'mongoose'
import { IAdmin } from '@/types'

export interface AdminDocument extends Omit<IAdmin, '_id'>, Document {
  isLocked(): boolean
  incrementFailedAttempts(): Promise<void>
  resetFailedAttempts(): Promise<void>
}

const AdminSchema = new Schema<AdminDocument>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

AdminSchema.index({ username: 1 }, { unique: true })

AdminSchema.methods.isLocked = function (): boolean {
  if (!this.lockedUntil) return false
  return new Date() < this.lockedUntil
}

AdminSchema.methods.incrementFailedAttempts = async function (): Promise<void> {
  this.failedLoginAttempts += 1
  if (this.failedLoginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  }
  await this.save()
}

AdminSchema.methods.resetFailedAttempts = async function (): Promise<void> {
  this.failedLoginAttempts = 0
  this.lockedUntil = null
  this.lastLoginAt = new Date()
  await this.save()
}

const Admin: Model<AdminDocument> =
  mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema)

export default Admin
