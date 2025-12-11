# Implementation Plan: Domain & Hosting Homepage

**Branch**: `002-domain-hosting-homepage` | **Date**: 2025-12-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-domain-hosting-homepage/spec.md`

## Summary

Chuyển đổi homepage từ trang placeholder sang trang bán hàng cho dịch vụ domain, hosting, SSL. Admin panel được đơn giản hóa để chỉ quản lý affiliate links và theme. Sử dụng hoàn toàn codebase hiện tại với Next.js 14, MongoDB, và 10 templates có sẵn.

## Technical Context

**Language/Version**: TypeScript 5.7, Node.js 20.x  
**Primary Dependencies**: Next.js 14 (App Router), Mongoose 8.x, NextAuth.js 4.x, TailwindCSS 3.x  
**Storage**: MongoDB (existing)  
**Testing**: ESLint, next build (type checking)  
**Target Platform**: Web (Desktop + Mobile responsive)  
**Project Type**: Web application (Next.js full-stack)  
**Performance Goals**: Homepage load < 3s on 3G  
**Constraints**: Admin authentication required, URL validation for affiliate links  
**Scale/Scope**: Single admin user, 3 default services (expandable)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Passed** - Constitution template chưa được customize cho project này. Không có violations.

## Project Structure

### Documentation (this feature)

```text
specs/002-domain-hosting-homepage/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI specification
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx                    # Homepage (MODIFY)
│   ├── api/
│   │   ├── homepage/
│   │   │   └── route.ts            # Public GET (NEW)
│   │   ├── admin/
│   │   │   └── homepage/
│   │   │       └── route.ts        # Admin GET/PUT (NEW)
│   │   └── track/
│   │       └── homepage-click/
│   │           └── route.ts        # Click tracking (NEW)
│   └── admin/
│       └── settings/
│           └── page.tsx            # Admin settings (NEW)
├── components/
│   ├── templates/                  # 10 templates (REUSE)
│   └── admin/
│       └── HomepageSettingsForm.tsx # Settings form (NEW)
├── models/
│   └── HomepageConfig.ts           # New model (NEW)
├── types/
│   └── index.ts                    # Add types (MODIFY)
└── lib/                            # Utilities (REUSE)

scripts/
└── seed.ts                         # Add homepage seed (MODIFY)
```

**Structure Decision**: Sử dụng cấu trúc Next.js App Router hiện có. Thêm các routes và components mới theo convention của project.

## Complexity Tracking

> Không có violations - implementation đơn giản, tái sử dụng components có sẵn.
