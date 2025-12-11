# Quickstart: Domain & Hosting Homepage

**Feature Branch**: `002-domain-hosting-homepage`

## Prerequisites

- Node.js 20.x
- MongoDB instance
- Environment variables configured (see `.env.example`)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Key Files to Modify/Create

### New Files

1. **Model**: `src/models/HomepageConfig.ts`
   - Mongoose schema for homepage configuration
   - Singleton pattern with fixed `_id: "homepage"`

2. **API Routes**:
   - `src/app/api/homepage/route.ts` - Public GET for homepage data
   - `src/app/api/admin/homepage/route.ts` - Admin GET/PUT
   - `src/app/api/track/homepage-click/route.ts` - Click tracking

3. **Admin Settings Page**: `src/app/admin/settings/page.tsx`
   - Form to update affiliate links
   - Theme selector with preview

4. **Homepage Component**: Update `src/app/page.tsx`
   - Fetch HomepageConfig
   - Render selected template with services

### Modified Files

1. `src/types/index.ts` - Add HomepageConfig types
2. `src/components/templates/*.tsx` - Adapt for homepage context (if needed)
3. `scripts/seed.ts` - Add homepage default data

## Development Flow

1. Create HomepageConfig model
2. Add seed data for default services
3. Create API endpoints
4. Build admin settings page
5. Update homepage to use dynamic config
6. Add click tracking

## Testing

```bash
# Run linter
npm run lint

# Build check
npm run build
```

## API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/homepage` | No | Get homepage config |
| GET | `/api/admin/homepage` | Yes | Get config for editing |
| PUT | `/api/admin/homepage` | Yes | Update config |
| POST | `/api/track/homepage-click` | No | Track CTA clicks |

## Environment Variables

```env
MONGODB_URI=mongodb://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```
