import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template8({ page }: TemplateProps) {
  const features = [
    { feature: 'Storage', starter: '10 GB', pro: '50 GB', enterprise: 'Unlimited' },
    { feature: 'Bandwidth', starter: '100 GB', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Websites', starter: '1', pro: '10', enterprise: 'Unlimited' },
    { feature: 'Free Domain', starter: '✗', pro: '✓', enterprise: '✓' },
    { feature: 'SSL Certificate', starter: '✓', pro: '✓', enterprise: '✓' },
    { feature: 'Daily Backups', starter: '✗', pro: '✓', enterprise: '✓' },
    { feature: 'Support', starter: 'Email', pro: '24/7', enterprise: 'Priority' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{page.description}</p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-gray-600 font-medium">Features</th>
                <th className="px-6 py-4 text-center text-gray-600 font-medium">Starter<br/><span className="text-blue-600 font-bold">$2.99/mo</span></th>
                <th className="px-6 py-4 text-center bg-blue-600 text-white font-medium">Professional<br/><span className="font-bold">$5.99/mo</span></th>
                <th className="px-6 py-4 text-center text-gray-600 font-medium">Enterprise<br/><span className="text-blue-600 font-bold">$12.99/mo</span></th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{row.starter}</td>
                  <td className="px-6 py-4 text-center bg-blue-50 text-blue-900 font-medium">{row.pro}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="px-6 py-6"></td>
                <td className="px-6 py-6 text-center">
                  <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Select" variant="outline" size="sm" />
                </td>
                <td className="px-6 py-6 text-center bg-blue-50">
                  <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Select" size="sm" />
                </td>
                <td className="px-6 py-6 text-center">
                  <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Select" variant="outline" size="sm" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
