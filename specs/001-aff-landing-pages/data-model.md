# Data Model: Affiliate Landing Pages

**Feature**: 001-aff-landing-pages  
**Date**: 2025-12-10

## Entities

### LandingPage

Represents a single affiliate landing page configuration.

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| _id | ObjectId | Auto | MongoDB document ID | - |
| slug | String | Yes | URL path identifier | Unique, lowercase, alphanumeric + hyphens, 3-50 chars |
| title | String | Yes | Page title (SEO + display) | 1-100 characters |
| description | String | Yes | Page description (SEO + display) | 1-500 characters |
| affiliateLink | String | Yes | Destination affiliate URL | Valid URL format |
| templateId | Number | Yes | Template identifier (1-10) | Integer 1-10, default: 1 |
| isActive | Boolean | Yes | Page visibility status | Default: true |
| createdAt | Date | Auto | Creation timestamp | - |
| updatedAt | Date | Auto | Last update timestamp | - |

**Indexes**:
- `slug`: Unique index for URL lookups
- `isActive`: For filtering active pages

**State Transitions**:
```
Created (isActive: true) → Deactivated (isActive: false) → Reactivated (isActive: true) → Deleted
```

### Admin

Represents the system administrator account.

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| _id | ObjectId | Auto | MongoDB document ID | - |
| username | String | Yes | Admin login username | Unique, 3-50 chars |
| passwordHash | String | Yes | Bcrypt hashed password | - |
| failedLoginAttempts | Number | Yes | Failed login counter | Default: 0 |
| lockedUntil | Date | No | Account lockout expiry | Null if not locked |
| lastLoginAt | Date | No | Last successful login | - |
| createdAt | Date | Auto | Creation timestamp | - |

**Indexes**:
- `username`: Unique index for login lookups

**Security Rules**:
- Password must be hashed with bcrypt (cost factor 12)
- After 5 failed attempts, lock account for 15 minutes
- Reset `failedLoginAttempts` on successful login

### PageStatistic

Tracks page views and affiliate link clicks per landing page.

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| _id | ObjectId | Auto | MongoDB document ID | - |
| pageId | ObjectId | Yes | Reference to LandingPage | Must exist |
| pageViews | Number | Yes | Total page view count | Default: 0, >= 0 |
| affiliateClicks | Number | Yes | Total affiliate link clicks | Default: 0, >= 0 |
| updatedAt | Date | Auto | Last update timestamp | - |

**Indexes**:
- `pageId`: Unique index (one stat record per page)

**Operations**:
- Increment `pageViews` on each page load
- Increment `affiliateClicks` on each CTA button click

## Relationships

```
┌─────────────┐         ┌────────────────┐
│   Admin     │         │  LandingPage   │
├─────────────┤         ├────────────────┤
│ _id         │         │ _id            │
│ username    │ manages │ slug           │
│ passwordHash│ ──────► │ title          │
│ ...         │  (1:N)  │ description    │
└─────────────┘         │ affiliateLink  │
                        │ templateId     │
                        │ isActive       │
                        └───────┬────────┘
                                │
                                │ has (1:1)
                                ▼
                        ┌────────────────┐
                        │ PageStatistic  │
                        ├────────────────┤
                        │ _id            │
                        │ pageId ────────┤
                        │ pageViews      │
                        │ affiliateClicks│
                        └────────────────┘
```

## MongoDB Schema (Mongoose)

### LandingPage Schema

```typescript
const LandingPageSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]{3,50}$/
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  affiliateLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'Invalid URL format'
    }
  },
  templateId: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });
```

### Admin Schema

```typescript
const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50
  },
  passwordHash: {
    type: String,
    required: true
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockedUntil: {
    type: Date,
    default: null
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });
```

### PageStatistic Schema

```typescript
const PageStatisticSchema = new Schema({
  pageId: {
    type: Schema.Types.ObjectId,
    ref: 'LandingPage',
    required: true,
    unique: true
  },
  pageViews: {
    type: Number,
    default: 0,
    min: 0
  },
  affiliateClicks: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });
```

## Seed Data

Initial admin account (password should be changed on first login):

```javascript
{
  username: "admin",
  passwordHash: bcrypt.hashSync("changeme123", 12),
  failedLoginAttempts: 0,
  lockedUntil: null
}
```
