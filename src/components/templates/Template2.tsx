import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template2({ page }: TemplateProps) {
  const features = [
    { icon: '✓', title: 'Free Domain', desc: 'Get a free domain with annual hosting plans' },
    { icon: '✓', title: '24/7 Support', desc: 'Expert support available around the clock' },
    { icon: '✓', title: 'Easy Setup', desc: 'One-click installs for WordPress and more' },
    { icon: '✓', title: 'Money Back', desc: '30-day money-back guarantee' },
    { icon: '✓', title: 'Free SSL', desc: 'SSL certificates included with all plans' },
    { icon: '✓', title: 'Daily Backups', desc: 'Automatic daily backups of your data' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Network Solutions</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {page.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {page.description}
          </p>
          <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Start Your Website Today" />
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Everything You Need to Succeed Online
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
                <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  {feature.icon}
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Get Started Now" size="lg" />
        </div>
      </main>
    </div>
  )
}
