# Implementation Plan: Affiliate Landing Pages

**Branch**: `001-aff-landing-pages` | **Date**: 2025-12-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-aff-landing-pages/spec.md`

## Summary

Xây dựng hệ thống affiliate landing pages cho Network Solutions với 10 templates responsive khác nhau, admin panel để quản lý cấu hình (link, tiêu đề, mô tả, template) cho từng trang, và tracking thống kê page views/clicks. Tech stack: Next.js + MongoDB.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20.x  
**Primary Dependencies**: Next.js 14 (App Router), MongoDB Driver/Mongoose, NextAuth.js (authentication), TailwindCSS (styling)  
**Storage**: MongoDB (Atlas or self-hosted)  
**Testing**: Jest + React Testing Library, Playwright (E2E)  
**Target Platform**: Web (Vercel/Node.js server)  
**Project Type**: Web application (monorepo Next.js)  
**Performance Goals**: Page load < 3s on 3G, support 50+ landing pages  
**Constraints**: Responsive design (desktop >1024px, mobile <768px), English language only  
**Scale/Scope**: Single admin user, ~50 landing pages, basic analytics (views/clicks)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Simplicity | PASS | Single Next.js app, no over-engineering |
| Library-First | N/A | Not a library project |
| Test-First | PASS | Will implement with Jest + Playwright |
| Observability | PASS | Next.js built-in logging, MongoDB metrics |

## Project Structure

### Documentation (this feature)

```text
specs/001-aff-landing-pages/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
└── tasks.md             # Phase 2 output (by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/                     # Next.js App Router
│   ├── (landing)/          # Landing pages routes
│   │   └── [slug]/         # Dynamic landing page route
│   ├── admin/              # Admin panel routes
│   │   ├── login/          # Admin login
│   │   ├── pages/          # Landing pages management
│   │   └── stats/          # Statistics view
│   └── api/                # API routes
│       ├── auth/           # Authentication endpoints
│       ├── pages/          # Landing pages CRUD
│       └── stats/          # Statistics endpoints
├── components/             # Shared React components
│   ├── templates/          # 10 landing page templates
│   │   ├── Template1.tsx
│   │   ├── Template2.tsx
│   │   └── ... (Template3-10)
│   ├── admin/              # Admin UI components
│   └── common/             # Shared UI components
├── lib/                    # Utilities and helpers
│   ├── db.ts               # MongoDB connection
│   ├── auth.ts             # Authentication helpers
│   └── tracking.ts         # Page view/click tracking
├── models/                 # MongoDB models
│   ├── LandingPage.ts
│   ├── Admin.ts
│   └── PageStatistic.ts
└── types/                  # TypeScript type definitions

tests/
├── unit/                   # Unit tests
├── integration/            # API integration tests
└── e2e/                    # Playwright E2E tests
```

**Structure Decision**: Single Next.js application using App Router. Admin panel and landing pages coexist in the same app with route groups for separation. Templates as React components for easy management.

## Complexity Tracking

No constitution violations. Simple architecture with single Next.js app + MongoDB.
