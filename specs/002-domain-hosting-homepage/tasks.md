# Tasks: Domain & Hosting Homepage

**Input**: Design documents from `/specs/002-domain-hosting-homepage/`  
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.yaml

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and types setup

- [x] T001 Add HomepageConfig types in src/types/index.ts
- [x] T002 [P] Create HomepageConfig model in src/models/HomepageConfig.ts
- [x] T003 [P] Add homepage seed data in scripts/seed.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core API endpoints that all user stories depend on

**⚠️ CRITICAL**: User Story implementation requires these API endpoints first

- [x] T004 Create public GET /api/homepage in src/app/api/homepage/route.ts
- [x] T005 [P] Create admin GET/PUT /api/admin/homepage in src/app/api/admin/homepage/route.ts
- [x] T006 [P] Create click tracking POST /api/track/homepage-click in src/app/api/track/homepage-click/route.ts

**Checkpoint**: APIs ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Khách hàng xem trang bán dịch vụ (Priority: P1) 🎯 MVP

**Goal**: Homepage hiển thị danh sách dịch vụ Domain, Hosting, SSL với CTA buttons và click tracking

**Independent Test**: Truy cập homepage, xác nhận hiển thị 3 dịch vụ với thông tin và CTA buttons hoạt động

### Implementation for User Story 1

- [x] T007 [US1] Create HomepageCTAButton component in src/components/homepage/HomepageCTAButton.tsx
- [x] T008 [US1] Create ServiceCard component in src/components/homepage/ServiceCard.tsx
- [x] T009 [US1] Update homepage to fetch and display services in src/app/page.tsx
- [x] T010 [US1] Integrate template rendering based on selectedTheme in src/app/page.tsx
- [x] T011 [US1] Ensure responsive design for mobile/tablet in src/app/page.tsx

**Checkpoint**: Homepage displays services with working CTAs - MVP complete

---

## Phase 4: User Story 2 - Admin thay đổi affiliate links (Priority: P1)

**Goal**: Admin có thể cập nhật affiliate links cho từng dịch vụ qua trang settings

**Independent Test**: Đăng nhập admin, thay đổi link, lưu và xác nhận link mới hiển thị trên homepage

### Implementation for User Story 2

- [x] T012 [P] [US2] Create HomepageSettingsForm component in src/components/admin/HomepageSettingsForm.tsx
- [x] T013 [US2] Create admin settings page in src/app/admin/settings/page.tsx
- [x] T014 [US2] Add URL validation for affiliate links in src/components/admin/HomepageSettingsForm.tsx
- [x] T015 [US2] Add success/error notifications in admin settings
- [x] T016 [US2] Add Settings link to admin navigation in src/app/admin/layout.tsx

**Checkpoint**: Admin can update affiliate links - core admin functionality complete

---

## Phase 5: User Story 3 - Admin đổi theme trang (Priority: P2)

**Goal**: Admin có thể chọn theme cho homepage từ 10 templates có sẵn

**Independent Test**: Chọn theme khác trong admin settings, xác nhận homepage hiển thị đúng theme mới

### Implementation for User Story 3

- [x] T017 [P] [US3] Create ThemeSelector component with preview in src/components/admin/ThemeSelector.tsx
- [x] T018 [US3] Integrate ThemeSelector into admin settings page in src/app/admin/settings/page.tsx
- [x] T019 [US3] Update homepage to render selected theme in src/app/page.tsx

**Checkpoint**: Admin can change theme - all user stories complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation

- [x] T020 [P] Run npm run lint and fix any issues
- [x] T021 [P] Run npm run build to verify type checking
- [x] T022 Verify all edge cases: empty links, invalid URLs, default theme
- [x] T023 Test responsive design on mobile viewport

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on T001, T002 (types and model)
- **User Story 1 (Phase 3)**: Depends on Phase 2 (APIs must exist)
- **User Story 2 (Phase 4)**: Depends on Phase 2 (APIs must exist)
- **User Story 3 (Phase 5)**: Depends on Phase 2 (APIs must exist)
- **Polish (Phase 6)**: Depends on all user stories

### User Story Dependencies

- **User Story 1 (P1)**: Independent - displays homepage
- **User Story 2 (P1)**: Independent - admin manages links
- **User Story 3 (P2)**: Independent - admin changes theme

### Within Each Phase

```
Phase 1: T001 → T002, T003 (parallel)
Phase 2: T004, T005, T006 (parallel after Phase 1)
Phase 3: T007, T008 (parallel) → T009 → T010 → T011
Phase 4: T012 → T013 → T014 → T015 → T016
Phase 5: T017 → T018 → T019
Phase 6: T020, T021 (parallel) → T022 → T023
```

---

## Parallel Example: Setup Phase

```bash
# After T001 (types) completes, run in parallel:
Task: T002 "Create HomepageConfig model in src/models/HomepageConfig.ts"
Task: T003 "Add homepage seed data in scripts/seed.ts"
```

## Parallel Example: Foundational Phase

```bash
# After Phase 1, run all API tasks in parallel:
Task: T004 "Create public GET /api/homepage"
Task: T005 "Create admin GET/PUT /api/admin/homepage"
Task: T006 "Create click tracking POST /api/track/homepage-click"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational APIs (T004-T006)
3. Complete Phase 3: User Story 1 (T007-T011)
4. **STOP and VALIDATE**: Homepage displays services with CTAs
5. Deploy if ready - basic affiliate landing page is functional

### Full Implementation

1. Setup → Foundational → US1 (MVP)
2. Add US2 (admin links) → Test admin can update
3. Add US3 (theme) → Test admin can change theme
4. Polish → Final validation

---

## Notes

- [P] tasks can run in parallel (different files)
- US1 and US2 are both P1 priority but independent
- Reuse existing templates from src/components/templates/
- NextAuth authentication already configured
- MongoDB connection already set up
