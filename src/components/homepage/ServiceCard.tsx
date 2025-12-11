import { IService } from '@/types'
import HomepageCTAButton from './HomepageCTAButton'

interface ServiceCardProps {
  service: IService
  variant?: 'light' | 'dark'
}

export default function ServiceCard({ service, variant = 'dark' }: ServiceCardProps) {
  const bgClass = variant === 'light' 
    ? 'bg-white shadow-lg' 
    : 'bg-white/10 backdrop-blur'
  
  const titleClass = variant === 'light'
    ? 'text-gray-900'
    : 'text-white'
  
  const descClass = variant === 'light'
    ? 'text-gray-600'
    : 'text-blue-200'

  return (
    <div className={`${bgClass} rounded-xl p-6 text-center`}>
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className={`text-xl font-semibold ${titleClass} mb-2`}>
        {service.name}
      </h3>
      <p className={`${descClass} mb-4`}>
        {service.description}
      </p>
      <HomepageCTAButton
        serviceId={service.id}
        affiliateLink={service.affiliateLink}
        text="Learn More"
        variant={variant === 'light' ? 'primary' : 'outline'}
      />
    </div>
  )
}
