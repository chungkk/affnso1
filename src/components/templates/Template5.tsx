import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template5({ page }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block w-16 h-1 bg-black mb-8"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            {page.title}
          </h1>
          <p className="text-lg text-gray-500 mb-12 leading-relaxed">
            {page.description}
          </p>
          <CTAButton
            slug={page.slug}
            affiliateLink={page.affiliateLink}
            text="Get Started"
            className="bg-black hover:bg-gray-800 text-white px-12 py-4 text-sm tracking-widest uppercase"
          />
          <div className="mt-16 flex justify-center gap-12 text-sm text-gray-400">
            <div>
              <p className="text-3xl font-light text-gray-900 mb-1">99.9%</p>
              <p>Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-light text-gray-900 mb-1">24/7</p>
              <p>Support</p>
            </div>
            <div>
              <p className="text-3xl font-light text-gray-900 mb-1">2M+</p>
              <p>Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
