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

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, maxlength: 50 },
  description: { type: String, required: true, maxlength: 200 },
  affiliateLink: { type: String, default: '' },
  icon: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { _id: false })

const HomepageConfigSchema = new mongoose.Schema({
  _id: { type: String, default: 'homepage' },
  selectedTheme: { type: Number, required: true, min: 1, max: 10, default: 1 },
  services: { type: [ServiceSchema], required: true },
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

  // Seed HomepageConfig
  const HomepageConfig = mongoose.models.HomepageConfig || mongoose.model('HomepageConfig', HomepageConfigSchema)

  await HomepageConfig.deleteOne({ _id: 'homepage' })
  console.log('Cleared existing homepage config')

  await HomepageConfig.create({
    _id: 'homepage',
    selectedTheme: 1,
    services: [
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
    ],
  })

  console.log('Homepage config created with default services')

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
