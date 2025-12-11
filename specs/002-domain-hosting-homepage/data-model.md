# Data Model: Domain & Hosting Homepage

**Feature Branch**: `002-domain-hosting-homepage`  
**Date**: 2025-12-11

## Entities

### HomepageConfig (New)

Singleton document để lưu cấu hình homepage.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| _id | String | Fixed: "homepage" | Singleton identifier |
| selectedTheme | Number | 1-10, default: 1 | Template ID được chọn |
| services | Service[] | Required, min: 1 | Danh sách dịch vụ |
| updatedAt | Date | Auto | Thời gian cập nhật cuối |
| createdAt | Date | Auto | Thời gian tạo |

### Service (Embedded in HomepageConfig)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | Unique within array | Identifier (domain, hosting, ssl, etc.) |
| name | String | Required, max: 50 | Tên hiển thị |
| description | String | Required, max: 200 | Mô tả ngắn |
| affiliateLink | String | Valid URL or empty | Link affiliate |
| icon | String | Required | Icon identifier (emoji hoặc icon name) |
| isActive | Boolean | Default: true | Có hiển thị hay không |
| order | Number | Default: 0 | Thứ tự hiển thị |

## Default Data

```json
{
  "_id": "homepage",
  "selectedTheme": 1,
  "services": [
    {
      "id": "domain",
      "name": "Domain Registration",
      "description": "Register your perfect domain name at competitive prices",
      "affiliateLink": "",
      "icon": "🌐",
      "isActive": true,
      "order": 1
    },
    {
      "id": "hosting",
      "name": "Web Hosting",
      "description": "Fast, reliable hosting with 99.9% uptime guarantee",
      "affiliateLink": "",
      "icon": "🚀",
      "isActive": true,
      "order": 2
    },
    {
      "id": "ssl",
      "name": "SSL Certificates",
      "description": "Secure your website with industry-standard encryption",
      "affiliateLink": "",
      "icon": "🔒",
      "isActive": true,
      "order": 3
    }
  ]
}
```

## Relationships

```
HomepageConfig (singleton)
    └── services[] (embedded array)
         └── Service (embedded document)
```

## Validation Rules

1. **selectedTheme**: Must be integer 1-10
2. **services.affiliateLink**: Must be valid URL (https://) or empty string
3. **services.name**: Required, non-empty
4. **services**: At least 1 service must exist

## State Transitions

HomepageConfig không có state transitions phức tạp:
- Create (seed data) → Update (admin changes)
- No delete operation (singleton)

## Indexes

```javascript
// No additional indexes needed - singleton document accessed by _id
```

## Existing Models (Unchanged)

- `LandingPage`: Giữ nguyên cho landing pages riêng lẻ
- `PageStatistic`: Giữ nguyên, sẽ tạo record cho homepage
- `Admin`: Giữ nguyên cho authentication
