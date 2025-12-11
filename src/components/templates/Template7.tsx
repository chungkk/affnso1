import { TemplateProps } from '@/types'
import CTAButton from './CTAButton'

export default function Template7({ page }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {page.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {page.description}
              </p>
              <CTAButton
                slug={page.slug}
                affiliateLink={page.affiliateLink}
                text="Start Building Today"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Domain Names</h3>
                <p className="text-blue-100 text-sm">Find your perfect .com, .net, .org</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Web Hosting</h3>
                <p className="text-purple-100 text-sm">Lightning fast servers</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">SSL Security</h3>
                <p className="text-orange-100 text-sm">Keep your site secure</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Email Hosting</h3>
                <p className="text-green-100 text-sm">Professional email solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
