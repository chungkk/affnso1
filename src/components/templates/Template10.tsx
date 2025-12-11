import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template10({ page }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              WATCH NOW
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{page.title}</h1>
            <p className="text-xl text-gray-400">{page.description}</p>
          </div>

          <div className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-video mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-gray-400">Click to watch our product tour</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div className="h-full w-0 bg-red-600"></div>
            </div>
          </div>

          <div className="text-center">
            <CTAButton
              slug={page.slug}
              affiliateLink={page.affiliateLink}
              text="Start Your Free Trial"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
            />
            <p className="mt-4 text-gray-500 text-sm">No credit card required • 30-day free trial</p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-white">10M+</p>
              <p className="text-gray-500">Websites Hosted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">99.99%</p>
              <p className="text-gray-500">Uptime SLA</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">150+</p>
              <p className="text-gray-500">Data Centers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
