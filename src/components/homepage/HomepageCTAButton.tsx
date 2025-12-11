'use client'

import { useState } from 'react'

interface HomepageCTAButtonProps {
  serviceId: string
  affiliateLink: string
  text?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function HomepageCTAButton({
  serviceId,
  affiliateLink,
  text = 'Get Started',
  className = '',
  variant = 'primary',
}: HomepageCTAButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (loading || !affiliateLink) return
    setLoading(true)

    try {
      await fetch('/api/track/homepage-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId }),
      })
    } catch (error) {
      console.error('Failed to track click:', error)
    } finally {
      window.location.href = affiliateLink
    }
  }

  if (!affiliateLink) {
    return (
      <span className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed ${className}`}>
        Coming Soon
      </span>
    )
  }

  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-3'

  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-blue-900 focus:ring-white',
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${className} ${loading ? 'opacity-75 cursor-wait' : ''}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Redirecting...
        </>
      ) : (
        text
      )}
    </button>
  )
}
