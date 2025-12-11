import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template1({ page }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {page.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            {page.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              slug={page.slug}
              affiliateLink={page.affiliateLink}
              text="Get Your Domain Now"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
            />
            <CTAButton
              slug={page.slug}
              affiliateLink={page.affiliateLink}
              text="View Hosting Plans"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
            />
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Domain Registration</h3>
            <p className="text-blue-200">Find your perfect domain name at unbeatable prices</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Web Hosting</h3>
            <p className="text-blue-200">Fast, reliable hosting with 99.9% uptime guarantee</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">SSL Certificates</h3>
            <p className="text-blue-200">Secure your website with industry-standard encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}
