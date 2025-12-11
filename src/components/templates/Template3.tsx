import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template3({ page }: TemplateProps) {
  const plans = [
    { name: 'Starter', price: '$2.99', period: '/mo', features: ['1 Website', '10GB Storage', 'Free SSL', 'Email Support'], popular: false },
    { name: 'Professional', price: '$5.99', period: '/mo', features: ['Unlimited Websites', '50GB Storage', 'Free SSL', 'Free Domain', '24/7 Support'], popular: true },
    { name: 'Enterprise', price: '$12.99', period: '/mo', features: ['Unlimited Everything', '100GB Storage', 'Free SSL', 'Free Domain', 'Priority Support', 'Daily Backups'], popular: false },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{page.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              {plan.popular && (
                <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={plan.popular ? 'text-blue-200' : 'text-gray-500'}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className={`w-5 h-5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <CTAButton
                slug={page.slug}
                affiliateLink={page.affiliateLink}
                text="Choose Plan"
                variant={plan.popular ? 'secondary' : 'primary'}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
