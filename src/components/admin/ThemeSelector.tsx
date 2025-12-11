'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/common/Card'
import { TemplateId } from '@/types'

interface ThemeSelectorProps {
  initialTheme: TemplateId
}

const THEMES = [
  { id: 1 as TemplateId, name: 'Blue Ocean', colors: 'from-blue-900 via-blue-800 to-indigo-900' },
  { id: 2 as TemplateId, name: 'Purple Dreams', colors: 'from-purple-900 via-purple-800 to-pink-900' },
  { id: 3 as TemplateId, name: 'Forest Green', colors: 'from-green-900 via-green-800 to-teal-900' },
  { id: 4 as TemplateId, name: 'Sunset Orange', colors: 'from-orange-600 via-red-600 to-pink-600' },
  { id: 5 as TemplateId, name: 'Dark Mode', colors: 'from-gray-900 via-gray-800 to-gray-900' },
  { id: 6 as TemplateId, name: 'Clean White', colors: 'bg-white' },
  { id: 7 as TemplateId, name: 'Cyan Wave', colors: 'from-cyan-500 via-blue-500 to-purple-500' },
  { id: 8 as TemplateId, name: 'Rose Garden', colors: 'from-rose-500 via-pink-500 to-purple-500' },
  { id: 9 as TemplateId, name: 'Emerald', colors: 'from-emerald-600 via-teal-600 to-cyan-600' },
  { id: 10 as TemplateId, name: 'Slate Professional', colors: 'from-slate-800 via-slate-700 to-zinc-800' },
]

export default function ThemeSelector({ initialTheme }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<TemplateId>(initialTheme)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleSubmit = async () => {
    setSubmitError('')
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedTheme }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to update theme')
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
        <CardTitle>Homepage Theme</CardTitle>
        <CardDescription>
          Select a theme for your homepage. Changes will be applied immediately after saving.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 mb-4">
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 mb-4">
            <p className="text-sm text-green-600">Theme updated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all
                ${selectedTheme === theme.id 
                  ? 'border-primary-500 ring-2 ring-primary-200' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div 
                className={`
                  h-16 rounded-md mb-2
                  ${theme.colors.includes('bg-white') 
                    ? 'bg-white border border-gray-200' 
                    : `bg-gradient-to-br ${theme.colors}`
                  }
                `}
              />
              <p className="text-sm font-medium text-gray-900 text-center">
                {theme.name}
              </p>
              {selectedTheme === theme.id && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <CardFooter className="flex justify-end pt-6">
          <Button onClick={handleSubmit} loading={loading}>
            Save Theme
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
