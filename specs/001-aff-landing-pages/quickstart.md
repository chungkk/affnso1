# Quickstart: Affiliate Landing Pages

**Feature**: 001-aff-landing-pages  
**Date**: 2025-12-10

## Prerequisites

- Node.js 20.x or later
- MongoDB (local or Atlas connection string)
- pnpm (recommended) or npm

## Setup

### 1. Initialize Project

```bash
# Create Next.js app with TypeScript
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install dependencies
pnpm add mongoose bcryptjs next-auth
pnpm add -D @types/bcryptjs jest @testing-library/react @testing-library/jest-dom playwright @playwright/test
```

### 2. Environment Variables

Create `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/aff-landing

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl

# Admin (initial setup only)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
```

### 3. Database Setup

```bash
# Start local MongoDB (if using Docker)
docker run -d -p 27017:27017 --name mongodb mongo:7

# Or use MongoDB Atlas - update MONGODB_URI with connection string
```

### 4. Run Development Server

```bash
pnpm dev
```

- Landing pages: `http://localhost:3000/{slug}`
- Admin panel: `http://localhost:3000/admin`
- API: `http://localhost:3000/api/*`

## Project Structure

```
src/
├── app/
│   ├── (landing)/[slug]/page.tsx    # Dynamic landing page
│   ├── admin/                        # Admin panel routes
│   └── api/                          # API routes
├── components/
│   └── templates/                    # 10 landing templates
├── lib/
│   ├── db.ts                         # MongoDB connection
│   └── auth.ts                       # Auth helpers
└── models/                           # Mongoose models
```

## Key Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server

# Testing
pnpm test               # Run Jest tests
pnpm test:e2e           # Run Playwright E2E tests

# Database
pnpm db:seed            # Seed initial admin user
```

## First Steps After Setup

1. Run `pnpm db:seed` to create initial admin account
2. Login at `/admin/login` with default credentials
3. Change admin password immediately
4. Create your first landing page
5. Access it at `/{slug}` you configured

## Development Workflow

1. **Create a template**: Add new component in `src/components/templates/`
2. **Add API endpoint**: Create route in `src/app/api/`
3. **Update admin UI**: Modify components in `src/app/admin/`
4. **Test**: Write tests in `tests/` directory

## Deployment (Vercel)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - MONGODB_URI (Atlas connection string)
# - NEXTAUTH_URL (production URL)
# - NEXTAUTH_SECRET
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check MONGODB_URI, ensure MongoDB is running |
| Auth not working | Verify NEXTAUTH_SECRET is set |
| Template not rendering | Check templateId is 1-10 |
| Slug 404 | Verify page exists and isActive: true |
