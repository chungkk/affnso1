# Research: Domain & Hosting Homepage

**Feature Branch**: `002-domain-hosting-homepage`  
**Date**: 2025-12-11

## Technical Stack Analysis

### Decision: Sử dụng codebase hiện tại
**Rationale**: Dự án đã có đầy đủ:
- Next.js 14 (App Router) với TypeScript
- MongoDB + Mongoose cho database
- NextAuth.js cho authentication
- TailwindCSS cho styling
- 10 templates có sẵn

**Alternatives considered**: Không có - sử dụng 100% tech stack hiện tại.

## Key Findings

### 1. Model Structure
- `LandingPage` model đã có: slug, title, description, affiliateLink, templateId, isActive
- `PageStatistic` model đã có: pageViews, affiliateClicks
- Cần tạo thêm `HomepageConfig` model cho cấu hình homepage

### 2. Templates System
- 10 templates trong `src/components/templates/Template1-10.tsx`
- Dùng `TemplateProps` interface với `page: ILandingPage`
- Có thể tái sử dụng cho homepage với minor modifications

### 3. Admin Authentication
- NextAuth.js đã cấu hình
- Session-based auth với credentials provider
- Middleware protection cho `/admin/*` routes

### 4. Click Tracking
- Có sẵn API endpoints: `/api/track/view`, `/api/track/click`
- `CTAButton` component xử lý click tracking
- Tái sử dụng cho homepage CTA buttons

## Architecture Decisions

### Decision: Single Collection cho HomepageConfig
**Rationale**: Chỉ có 1 homepage, dùng singleton document pattern.

```typescript
// HomepageConfig - singleton document
{
  _id: "homepage",
  selectedTheme: 1,
  services: [
    { name: "Domain", affiliateLink: "...", isActive: true },
    { name: "Hosting", affiliateLink: "...", isActive: true },
    { name: "SSL", affiliateLink: "...", isActive: true }
  ],
  updatedAt: Date
}
```

### Decision: Reuse Existing Templates
**Rationale**: 10 templates đã có sẵn, chỉ cần adapt props cho homepage context.

### Decision: Admin Settings Page
**Rationale**: Thêm route `/admin/settings` cho cấu hình homepage thay vì thay đổi dashboard hiện tại.

## No Unresolved Clarifications

Tất cả requirements đã rõ ràng:
- ✅ 3 dịch vụ mặc định (Domain, Hosting, SSL)
- ✅ Admin chỉ quản lý links và theme
- ✅ Sử dụng templates có sẵn
- ✅ Click tracking có sẵn
