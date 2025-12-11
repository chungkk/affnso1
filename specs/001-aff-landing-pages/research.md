# Research: Affiliate Landing Pages

**Feature**: 001-aff-landing-pages  
**Date**: 2025-12-10

## Technology Decisions

### 1. Next.js Version & Architecture

**Decision**: Next.js 14 with App Router

**Rationale**:
- App Router provides better server-side rendering for landing pages (SEO benefits)
- Server Components reduce client-side JavaScript (faster page loads)
- Built-in API routes eliminate need for separate backend
- Vercel deployment optimized for Next.js

**Alternatives Considered**:
- Pages Router: More mature but App Router is the future direction
- Separate Express backend: Over-engineering for this use case

### 2. MongoDB Integration

**Decision**: Mongoose ODM with MongoDB Atlas

**Rationale**:
- Schema validation at application level
- TypeScript integration with type safety
- MongoDB Atlas provides free tier sufficient for this scale
- Mongoose middleware useful for tracking/auditing

**Alternatives Considered**:
- Native MongoDB driver: Less boilerplate but no schema validation
- PostgreSQL: More structured but MongoDB better for flexible document storage

### 3. Authentication

**Decision**: NextAuth.js with Credentials Provider

**Rationale**:
- Single admin user makes simple credentials sufficient
- NextAuth.js integrates seamlessly with Next.js
- Session-based auth with JWT for API routes
- Built-in CSRF protection

**Alternatives Considered**:
- Custom JWT implementation: More work, less secure
- OAuth providers: Overkill for single admin

### 4. Styling Approach

**Decision**: TailwindCSS + CSS Modules for templates

**Rationale**:
- TailwindCSS provides rapid responsive design
- CSS Modules for template-specific styles to avoid conflicts
- No runtime CSS-in-JS overhead

**Alternatives Considered**:
- Styled Components: Runtime overhead
- Plain CSS: Slower development

### 5. Template Architecture

**Decision**: React Server Components with dynamic imports

**Rationale**:
- 10 templates as separate components
- Dynamic import reduces initial bundle size
- Server Components for static content, Client Components only for interactive elements

**Alternatives Considered**:
- Single component with conditional rendering: Less maintainable
- Separate pages per template: URL complexity

### 6. Statistics Tracking

**Decision**: Server-side tracking with MongoDB aggregation

**Rationale**:
- No client-side tracking library needed (simpler)
- MongoDB aggregation for stats queries
- Middleware-based page view tracking
- Click tracking via API endpoint before redirect

**Alternatives Considered**:
- Google Analytics: External dependency, GDPR concerns
- Redis for counters: Additional infrastructure

### 7. Testing Strategy

**Decision**: Jest (unit/integration) + Playwright (E2E)

**Rationale**:
- Jest native support in Next.js
- React Testing Library for component tests
- Playwright for cross-browser E2E testing
- Good balance of test coverage vs complexity

**Alternatives Considered**:
- Cypress: Slower, less reliable for modern React
- Vitest: Less mature Next.js integration

## Best Practices Applied

### Next.js Performance
- Use `next/image` for optimized images
- Implement ISR (Incremental Static Regeneration) for landing pages
- Edge middleware for geo-based routing if needed

### MongoDB
- Index `slug` field for fast lookups
- Compound index on `pageId + date` for statistics
- Connection pooling with singleton pattern

### Security
- Rate limiting on login (5 attempts / 15 min lockout)
- Password hashing with bcrypt (cost factor 12)
- Input sanitization for slug (alphanumeric + hyphens only)
- URL validation for affiliate links

### SEO
- Dynamic meta tags from page configuration
- Structured data for landing pages
- Sitemap generation

## Resolved Clarifications

| Item | Resolution |
|------|------------|
| Language | English only (from spec clarification) |
| Tech stack | Next.js + MongoDB (from user input) |
| Admin count | Single admin user (from spec assumptions) |
| Statistics granularity | Total counts only, no time-series (from spec assumptions) |
