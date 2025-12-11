import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template6({ page }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full mb-6">
                LIMITED TIME OFFER
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {page.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {page.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  slug={page.slug}
                  affiliateLink={page.affiliateLink}
                  text="Claim Your Deal"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                />
                <CTAButton
                  slug={page.slug}
                  affiliateLink={page.affiliateLink}
                  text="Learn More"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600 px-8 py-4 text-lg"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-8 md:px-12 py-6">
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-600">50%</p>
                  <p className="text-sm text-gray-500">Discount</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-600">Free</p>
                  <p className="text-sm text-gray-500">Domain</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">Free</p>
                  <p className="text-sm text-gray-500">SSL</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">24/7</p>
                  <p className="text-sm text-gray-500">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
