'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/common/Card'
import { LandingPageInput } from '@/types'
import { validateLandingPage } from '@/lib/validation'

export default function PageCreateForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<LandingPageInput>({
    slug: '',
    title: '',
    description: '',
    affiliateLink: '',
    templateId: 1,
    isActive: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (field: keyof LandingPageInput, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
    setSubmitError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    const validation = validateLandingPage(formData)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to create page')
        return
      }

      router.push('/admin/pages')
      router.refresh()
    } catch {
      setSubmitError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const templates = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <Input
            label="Slug"
            type="text"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            error={errors.slug}
            helperText="URL path: /{slug} (letters, numbers, and hyphens only)"
            placeholder="my-landing-page"
          />

          <Input
            label="Title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            placeholder="Get Your Domain Today"
            maxLength={100}
          />

          <div className="w-full">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`
                block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm
                placeholder:text-gray-400 min-h-[100px]
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${errors.description ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Best deals on domain registration..."
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          <Input
            label="Affiliate Link"
            type="url"
            value={formData.affiliateLink}
            onChange={(e) => handleChange('affiliateLink', e.target.value)}
            error={errors.affiliateLink}
            placeholder="https://example.com/affiliate-link"
          />

          <div className="w-full">
            <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              id="templateId"
              value={formData.templateId}
              onChange={(e) => handleChange('templateId', parseInt(e.target.value, 10))}
              className={`
                block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${errors.templateId ? 'border-red-500' : 'border-gray-300'}
              `}
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            {errors.templateId && (
              <p className="mt-1 text-sm text-red-600">{errors.templateId}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active (visible to visitors)
            </label>
          </div>

          <CardFooter className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Create Page
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
