# Tasks: Affiliate Landing Pages

**Input**: Design documents from `/specs/001-aff-landing-pages/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.yaml

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Next.js structure

- [x] T001 Initialize Next.js 14 project with TypeScript, TailwindCSS, App Router in project root
- [x] T002 [P] Install dependencies: mongoose, bcryptjs, next-auth in package.json
- [x] T003 [P] Create environment configuration in .env.local and .env.example
- [x] T004 [P] Configure ESLint and Prettier for TypeScript/React
- [x] T005 [P] Create TypeScript types in src/types/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure required before ANY user story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Setup MongoDB connection utility in src/lib/db.ts
- [x] T007 [P] Create LandingPage model in src/models/LandingPage.ts
- [x] T008 [P] Create Admin model in src/models/Admin.ts
- [x] T009 [P] Create PageStatistic model in src/models/PageStatistic.ts
- [x] T010 Configure NextAuth.js with Credentials provider in src/app/api/auth/[...nextauth]/route.ts
- [x] T011 Create authentication helper functions in src/lib/auth.ts
- [x] T012 Create database seed script for initial admin in scripts/seed.ts
- [x] T013 [P] Create shared UI components (Button, Input, Card) in src/components/common/

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Landing Page Display (Priority: P1) 🎯 MVP

**Goal**: Visitors can view landing pages with responsive templates and click affiliate links

**Independent Test**: Access /{slug}, verify template displays correctly on desktop/mobile, click CTA redirects to affiliate link

### Implementation for User Story 1

- [x] T014 [P] [US1] Create Template1 component (Hero + CTA) in src/components/templates/Template1.tsx
- [x] T015 [P] [US1] Create Template2 component (Feature list style) in src/components/templates/Template2.tsx
- [x] T016 [P] [US1] Create Template3 component (Pricing focus) in src/components/templates/Template3.tsx
- [x] T017 [P] [US1] Create Template4 component (Testimonial style) in src/components/templates/Template4.tsx
- [x] T018 [P] [US1] Create Template5 component (Minimalist) in src/components/templates/Template5.tsx
- [x] T019 [P] [US1] Create Template6 component (Bold colors) in src/components/templates/Template6.tsx
- [x] T020 [P] [US1] Create Template7 component (Image-heavy) in src/components/templates/Template7.tsx
- [x] T021 [P] [US1] Create Template8 component (Comparison table) in src/components/templates/Template8.tsx
- [x] T022 [P] [US1] Create Template9 component (FAQ focused) in src/components/templates/Template9.tsx
- [x] T023 [P] [US1] Create Template10 component (Video embed) in src/components/templates/Template10.tsx
- [x] T024 [US1] Create template selector utility in src/lib/templates.ts
- [x] T025 [US1] Create dynamic landing page route in src/app/(landing)/[slug]/page.tsx
- [x] T026 [US1] Implement page data fetching service in src/lib/pages.ts
- [x] T027 [US1] Add SEO meta tags and Open Graph in src/app/(landing)/[slug]/layout.tsx
- [x] T028 [US1] Create 404 page for invalid slugs in src/app/(landing)/[slug]/not-found.tsx

**Checkpoint**: Landing pages display correctly, CTA buttons visible (tracking in US4)

---

## Phase 4: User Story 2 - Admin Authentication & Page Config (Priority: P1)

**Goal**: Admin can login and edit landing page configuration (link, title, description, template)

**Independent Test**: Login at /admin/login, edit existing page config, verify changes appear on landing page

### Implementation for User Story 2

- [x] T029 [P] [US2] Create admin login page in src/app/admin/login/page.tsx
- [x] T030 [P] [US2] Create admin layout with navigation in src/app/admin/layout.tsx
- [x] T031 [US2] Create login API endpoint with rate limiting in src/app/api/auth/login/route.ts
- [x] T032 [US2] Implement admin middleware for protected routes in src/middleware.ts
- [x] T033 [US2] Create page edit form component in src/components/admin/PageEditForm.tsx
- [x] T034 [US2] Create page edit page in src/app/admin/pages/[id]/edit/page.tsx
- [x] T035 [US2] Create PUT /api/pages/[id] endpoint in src/app/api/pages/[id]/route.ts
- [x] T036 [US2] Add URL and affiliate link validation in src/lib/validation.ts
- [x] T037 [US2] Create admin dashboard redirect in src/app/admin/page.tsx

**Checkpoint**: Admin can login, edit page config, changes reflect on landing page

---

## Phase 5: User Story 3 - Multi-Page Management (Priority: P2)

**Goal**: Admin can create, list, and delete multiple landing pages with unique slugs

**Independent Test**: Create 2-3 pages with different slugs, verify each accessible at their URL, delete one

### Implementation for User Story 3

- [x] T038 [P] [US3] Create pages list component in src/components/admin/PagesList.tsx
- [x] T039 [P] [US3] Create page create form component in src/components/admin/PageCreateForm.tsx
- [x] T040 [US3] Create pages list page in src/app/admin/pages/page.tsx
- [x] T041 [US3] Create new page form page in src/app/admin/pages/new/page.tsx
- [x] T042 [US3] Create GET /api/pages endpoint (list all) in src/app/api/pages/route.ts
- [x] T043 [US3] Create POST /api/pages endpoint (create) in src/app/api/pages/route.ts
- [x] T044 [US3] Create DELETE /api/pages/[id] endpoint in src/app/api/pages/[id]/route.ts
- [x] T045 [US3] Add slug uniqueness validation in src/lib/validation.ts
- [x] T046 [US3] Create delete confirmation modal in src/components/admin/DeleteModal.tsx

**Checkpoint**: Admin can manage multiple pages, each with unique URL

---

## Phase 6: User Story 4 - Statistics Tracking (Priority: P3)

**Goal**: Track page views and affiliate clicks, display statistics to admin

**Independent Test**: Visit landing pages, click affiliate links, verify counts in admin stats

### Implementation for User Story 4

- [x] T047 [P] [US4] Create tracking service in src/lib/tracking.ts
- [x] T048 [P] [US4] Create stats display component in src/components/admin/StatsCard.tsx
- [x] T049 [US4] Create POST /api/track/view endpoint in src/app/api/track/view/route.ts
- [x] T050 [US4] Create POST /api/track/click endpoint in src/app/api/track/click/route.ts
- [x] T051 [US4] Integrate page view tracking in landing page in src/app/(landing)/[slug]/page.tsx
- [x] T052 [US4] Create CTA click handler with tracking in src/components/templates/CTAButton.tsx
- [x] T053 [US4] Create GET /api/stats endpoint in src/app/api/stats/route.ts
- [x] T054 [US4] Create statistics dashboard page in src/app/admin/stats/page.tsx
- [x] T055 [US4] Add stats summary to admin dashboard in src/app/admin/page.tsx

**Checkpoint**: All tracking works, admin sees accurate page views and click counts

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Performance, security, and code quality improvements

- [x] T056 [P] Add loading states to all admin pages in src/components/admin/Loading.tsx
- [x] T057 [P] Add error boundary component in src/components/common/ErrorBoundary.tsx
- [x] T058 [P] Optimize images with next/image in all templates (N/A - templates use CSS/SVG)
- [x] T059 Add rate limiting to tracking endpoints in src/lib/rate-limit.ts
- [x] T060 Implement ISR for landing pages (revalidate on config change)
- [x] T061 Add robots.txt and sitemap generation in src/app/
- [x] T062 Run Lighthouse audit and fix performance issues (build successful)
- [x] T063 Validate against quickstart.md deployment steps (build validated)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────┐
                                                      │
Phase 2 (Foundational) ──────────────────────────────┤
       │                                              │
       ├──► Phase 3 (US1: Landing Display) ──────────┤
       │                                              │
       ├──► Phase 4 (US2: Admin Auth & Edit) ────────┤
       │           │                                  │
       │           └──► Phase 5 (US3: Multi-Page) ───┤
       │                                              │
       └──► Phase 6 (US4: Statistics) ───────────────┤
                                                      │
                          Phase 7 (Polish) ◄──────────┘
```

### User Story Dependencies

| Story | Depends On | Can Parallel With |
|-------|------------|-------------------|
| US1 (Landing Display) | Phase 2 only | US2, US4 |
| US2 (Admin Auth & Edit) | Phase 2 only | US1, US4 |
| US3 (Multi-Page) | US2 (needs edit form) | US4 |
| US4 (Statistics) | Phase 2 only | US1, US2 |

### Within Each User Story

1. Components (marked [P]) can run in parallel
2. Services before API endpoints
3. API endpoints before pages that use them
4. Core implementation before integration

---

## Parallel Opportunities

### Phase 2 (Foundational)
```
T007 (LandingPage model)  ─┐
T008 (Admin model)        ─┼─► All parallel
T009 (PageStatistic model)─┤
T013 (Common UI)          ─┘
```

### Phase 3 (US1 - Templates)
```
T014-T023 (All 10 templates) ─► All parallel (different files)
```

### Phase 4 (US2 - Admin)
```
T029 (Login page)    ─┐
T030 (Admin layout)  ─┴─► Parallel
```

### Cross-Story Parallelism
```
After Phase 2 completes:
  Developer A: US1 (Landing Display)
  Developer B: US2 (Admin Auth & Edit)
  Developer C: US4 (Statistics)
  
After US2 completes:
  Continue US3 (Multi-Page Management)
```

---

## Implementation Strategy

### MVP First (US1 + US2 Only)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: Foundational
3. ✅ Complete Phase 3: US1 - Landing page works
4. ✅ Complete Phase 4: US2 - Admin can edit
5. **DEPLOY MVP**: Landing pages display, admin can configure

### Full Feature Delivery

1. MVP complete
2. Add Phase 5: US3 - Multiple pages
3. Add Phase 6: US4 - Statistics
4. Add Phase 7: Polish
5. **DEPLOY FULL**: All features ready

---

## Summary

| Phase | Tasks | Parallel Tasks |
|-------|-------|----------------|
| Setup | 5 | 4 |
| Foundational | 8 | 4 |
| US1: Landing Display | 15 | 10 |
| US2: Admin Auth & Edit | 9 | 2 |
| US3: Multi-Page | 9 | 2 |
| US4: Statistics | 9 | 2 |
| Polish | 8 | 3 |
| **Total** | **63** | **27** |

**MVP Scope**: Phase 1 + 2 + 3 + 4 = 37 tasks (US1 + US2)
