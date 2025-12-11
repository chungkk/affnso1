import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template4({ page }: TemplateProps) {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Small Business Owner', text: 'Network Solutions made it incredibly easy to get my business online. Their support team is amazing!', rating: 5 },
    { name: 'Michael Chen', role: 'Web Developer', text: 'I have been using their hosting for 3 years. Reliable, fast, and great value for money.', rating: 5 },
    { name: 'Emily Davis', role: 'Blogger', text: 'The one-click WordPress install saved me hours. My blog was up and running in minutes!', rating: 5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{page.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">{page.description}</p>
          <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Join Thousands of Happy Customers" />
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-white mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Trusted by over 2 million customers worldwide</p>
          <CTAButton slug={page.slug} affiliateLink={page.affiliateLink} text="Start Your Journey Today" size="lg" />
        </div>
      </div>
    </div>
  )
}
