export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateSlug(slug: string): ValidationResult {
  if (!slug || typeof slug !== 'string') {
    return { valid: false, error: 'Slug is required' }
  }

  const trimmed = slug.trim().toLowerCase()
  
  if (trimmed.length < 3 || trimmed.length > 50) {
    return { valid: false, error: 'Slug must be between 3 and 50 characters' }
  }

  if (!/^[a-z0-9-]+$/.test(trimmed)) {
    return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }

  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return { valid: false, error: 'Slug cannot start or end with a hyphen' }
  }

  if (trimmed.includes('--')) {
    return { valid: false, error: 'Slug cannot contain consecutive hyphens' }
  }

  return { valid: true }
}

export function validateUrl(url: string): ValidationResult {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' }
  }

  const trimmed = url.trim()

  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return { valid: false, error: 'URL must start with http:// or https://' }
  }

  try {
    const parsed = new URL(trimmed)
    if (!parsed.hostname || parsed.hostname.length < 3) {
      return { valid: false, error: 'Invalid URL format' }
    }
    return { valid: true }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

export function validateAffiliateLink(link: string): ValidationResult {
  const urlValidation = validateUrl(link)
  if (!urlValidation.valid) {
    return { valid: false, error: `Affiliate link: ${urlValidation.error}` }
  }

  return { valid: true }
}

export function validateTitle(title: string): ValidationResult {
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Title is required' }
  }

  const trimmed = title.trim()

  if (trimmed.length === 0) {
    return { valid: false, error: 'Title cannot be empty' }
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Title cannot exceed 100 characters' }
  }

  return { valid: true }
}

export function validateDescription(description: string): ValidationResult {
  if (!description || typeof description !== 'string') {
    return { valid: false, error: 'Description is required' }
  }

  const trimmed = description.trim()

  if (trimmed.length === 0) {
    return { valid: false, error: 'Description cannot be empty' }
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Description cannot exceed 500 characters' }
  }

  return { valid: true }
}

export function validateTemplateId(templateId: number): ValidationResult {
  if (typeof templateId !== 'number') {
    return { valid: false, error: 'Template ID must be a number' }
  }

  if (!Number.isInteger(templateId)) {
    return { valid: false, error: 'Template ID must be an integer' }
  }

  if (templateId < 1 || templateId > 10) {
    return { valid: false, error: 'Template ID must be between 1 and 10' }
  }

  return { valid: true }
}

export interface LandingPageValidationInput {
  slug: string
  title: string
  description: string
  affiliateLink: string
  templateId?: number
  isActive?: boolean
}

export interface LandingPageValidationResult {
  valid: boolean
  errors: Record<string, string>
}

export async function checkSlugUniqueness(
  slug: string,
  excludeId?: string
): Promise<ValidationResult> {
  const { default: dbConnect } = await import('@/lib/db')
  const { default: LandingPage } = await import('@/models/LandingPage')
  
  await dbConnect()
  
  const normalizedSlug = slug.toLowerCase().trim()
  const query: Record<string, unknown> = { slug: normalizedSlug }
  
  if (excludeId) {
    query._id = { $ne: excludeId }
  }
  
  const existingPage = await LandingPage.findOne(query)
  
  if (existingPage) {
    return { valid: false, error: 'A page with this slug already exists' }
  }
  
  return { valid: true }
}

export function validateLandingPage(input: LandingPageValidationInput): LandingPageValidationResult {
  const errors: Record<string, string> = {}

  const slugValidation = validateSlug(input.slug)
  if (!slugValidation.valid) {
    errors.slug = slugValidation.error!
  }

  const titleValidation = validateTitle(input.title)
  if (!titleValidation.valid) {
    errors.title = titleValidation.error!
  }

  const descriptionValidation = validateDescription(input.description)
  if (!descriptionValidation.valid) {
    errors.description = descriptionValidation.error!
  }

  const affiliateLinkValidation = validateAffiliateLink(input.affiliateLink)
  if (!affiliateLinkValidation.valid) {
    errors.affiliateLink = affiliateLinkValidation.error!
  }

  if (input.templateId !== undefined) {
    const templateValidation = validateTemplateId(input.templateId)
    if (!templateValidation.valid) {
      errors.templateId = templateValidation.error!
    }
  }

  if (input.isActive !== undefined && typeof input.isActive !== 'boolean') {
    errors.isActive = 'isActive must be a boolean'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
