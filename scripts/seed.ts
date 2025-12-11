import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aff-landing'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123'

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null },
  lastLoginAt: { type: Date, default: null },
}, { timestamps: true })

async function seed() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

  // Delete existing admin and recreate (force reset)
  await Admin.deleteOne({ username: ADMIN_USERNAME })
  console.log('Cleared existing admin user')

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)

  await Admin.create({
    username: ADMIN_USERNAME,
    passwordHash,
    failedLoginAttempts: 0,
    lockedUntil: null,
  })

  console.log(`Admin user "${ADMIN_USERNAME}" created successfully.`)
  console.log('Default password:', ADMIN_PASSWORD)
  console.log('Please change the password after first login!')

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
