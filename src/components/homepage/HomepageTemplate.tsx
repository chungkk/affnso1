import { IHomepageConfig, IService } from '@/types'
import ServiceCard from './ServiceCard'
import HomepageCTAButton from './HomepageCTAButton'

interface HomepageTemplateProps {
  config: IHomepageConfig
}

function getThemeStyles(themeId: number) {
  const themes = {
    1: { bg: 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900', title: 'text-white', subtitle: 'text-blue-100', variant: 'dark' as const },
    2: { bg: 'bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900', title: 'text-white', subtitle: 'text-purple-100', variant: 'dark' as const },
    3: { bg: 'bg-gradient-to-br from-green-900 via-green-800 to-teal-900', title: 'text-white', subtitle: 'text-green-100', variant: 'dark' as const },
    4: { bg: 'bg-gradient-to-br from-orange-600 via-red-600 to-pink-600', title: 'text-white', subtitle: 'text-orange-100', variant: 'dark' as const },
    5: { bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900', title: 'text-white', subtitle: 'text-gray-300', variant: 'dark' as const },
    6: { bg: 'bg-white', title: 'text-gray-900', subtitle: 'text-gray-600', variant: 'light' as const },
    7: { bg: 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500', title: 'text-white', subtitle: 'text-cyan-100', variant: 'dark' as const },
    8: { bg: 'bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500', title: 'text-white', subtitle: 'text-rose-100', variant: 'dark' as const },
    9: { bg: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600', title: 'text-white', subtitle: 'text-emerald-100', variant: 'dark' as const },
    10: { bg: 'bg-gradient-to-br from-slate-800 via-slate-700 to-zinc-800', title: 'text-white', subtitle: 'text-slate-300', variant: 'dark' as const },
  }
  return themes[themeId as keyof typeof themes] || themes[1]
}

export default function HomepageTemplate({ config }: HomepageTemplateProps) {
  const theme = getThemeStyles(config.selectedTheme)
  const activeServices = config.services
    .filter((s: IService) => s.isActive)
    .sort((a: IService, b: IService) => a.order - b.order)

  const mainService = activeServices[0]

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${theme.title} mb-6`}>
            Premium Domain & Hosting Services
          </h1>
          <p className={`text-xl md:text-2xl ${theme.subtitle} mb-8 leading-relaxed`}>
            Get your business online with our reliable domain registration, web hosting, and SSL certificates
          </p>
          {mainService && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HomepageCTAButton
                serviceId={mainService.id}
                affiliateLink={mainService.affiliateLink}
                text="Get Started Now"
                variant="primary"
                className="px-8 py-4 text-lg"
              />
              {activeServices[1] && (
                <HomepageCTAButton
                  serviceId={activeServices[1].id}
                  affiliateLink={activeServices[1].affiliateLink}
                  text="View Plans"
                  variant="outline"
                  className="px-8 py-4 text-lg"
                />
              )}
            </div>
          )}
        </div>

        <div className={`mt-16 grid md:grid-cols-${Math.min(activeServices.length, 3)} gap-8 max-w-5xl mx-auto`}>
          {activeServices.map((service: IService) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              variant={theme.variant}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
