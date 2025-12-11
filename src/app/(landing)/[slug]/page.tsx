import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/pages'
import { getTemplate } from '@/lib/templates'
import { trackPageView } from '@/lib/tracking'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page) {
    notFound()
  }
  
  // Track page view server-side
  await trackPageView(slug)
  
  const Template = getTemplate(page.templateId)
  
  return <Template page={page} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }
  
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  }
}
