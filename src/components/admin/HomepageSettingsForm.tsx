'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/common/Card'
import { IHomepageConfig, IService } from '@/types'

interface HomepageSettingsFormProps {
  initialConfig: IHomepageConfig
}

export default function HomepageSettingsForm({ initialConfig }: HomepageSettingsFormProps) {
  const [services, setServices] = useState<IService[]>(initialConfig.services)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const validateUrl = (url: string): boolean => {
    if (!url) return true
    return /^https?:\/\/.+/.test(url)
  }

  const handleLinkChange = (serviceId: string, value: string) => {
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, affiliateLink: value } : s
    ))
    
    if (errors[serviceId]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[serviceId]
        return updated
      })
    }
    setSubmitError('')
  }

  const handleActiveChange = (serviceId: string, value: boolean) => {
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, isActive: value } : s
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSuccess(false)

    const newErrors: Record<string, string> = {}
    services.forEach(service => {
      if (service.affiliateLink && !validateUrl(service.affiliateLink)) {
        newErrors[service.id] = 'Please enter a valid URL (starting with http:// or https://)'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: services.map(s => ({
            id: s.id,
            affiliateLink: s.affiliateLink,
            isActive: s.isActive,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to update settings')
        return
      }

      setSuccess(true)
    } catch {
      setSubmitError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Affiliate Links</CardTitle>
        <CardDescription>
          Configure affiliate links for each service. Leave empty to show &quot;Coming Soon&quot;.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}
          {success && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-600">Settings saved successfully!</p>
            </div>
          )}

          {services.map(service => (
            <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{service.icon}</span>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={service.isActive}
                    onChange={(e) => handleActiveChange(service.id, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">Active</span>
                </label>
              </div>
              <Input
                label="Affiliate Link"
                type="url"
                value={service.affiliateLink}
                onChange={(e) => handleLinkChange(service.id, e.target.value)}
                error={errors[service.id]}
                placeholder="https://example.com/affiliate-link"
                helperText={service.description}
              />
            </div>
          ))}

          <CardFooter className="flex justify-end pt-4">
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
