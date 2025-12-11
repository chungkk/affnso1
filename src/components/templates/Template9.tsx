import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template9({ page }: TemplateProps) {
  const faqs = [
    { q: 'What is web hosting?', a: 'Web hosting is a service that allows you to publish your website on the internet. When you purchase a hosting plan, you rent space on a server where your website files are stored.' },
    { q: 'Do I get a free domain?', a: 'Yes! With our Professional and Enterprise plans, you get a free domain name for the first year. This includes popular extensions like .com, .net, and .org.' },
    { q: 'Is SSL included?', a: 'Absolutely! All our hosting plans include a free SSL certificate to secure your website and protect your visitors data.' },
    { q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade your hosting plan at any time. The process is seamless and your website will experience no downtime during the upgrade.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{page.title}</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto mb-8">{page.description}</p>
          <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Get Started" className="bg-white text-teal-600 hover:bg-teal-50" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-gray-50 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium text-gray-900">
                {faq.q}
                <span className="ml-4 flex-shrink-0 text-teal-600 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-4 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? Our support team is here to help!</p>
          <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Contact Support" variant="outline" />
        </div>
      </div>
    </div>
  )
}
