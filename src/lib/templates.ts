import { ComponentType } from 'react'
import { TemplateProps, TemplateId } from '@/types'
import {
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
  Template7,
  Template8,
  Template9,
  Template10,
} from '@/components/templates'

const templates: Record<TemplateId, ComponentType<TemplateProps>> = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
  6: Template6,
  7: Template7,
  8: Template8,
  9: Template9,
  10: Template10,
}

export function getTemplate(templateId: number): ComponentType<TemplateProps> {
  const id = templateId as TemplateId
  return templates[id] || templates[1]
}

export function isValidTemplateId(templateId: number): templateId is TemplateId {
  return templateId >= 1 && templateId <= 10
}

export const templateNames: Record<TemplateId, string> = {
  1: 'Hero + CTA',
  2: 'Feature List',
  3: 'Pricing Focus',
  4: 'Testimonials',
  5: 'Minimalist',
  6: 'Bold Colors',
  7: 'Image Heavy',
  8: 'Comparison Table',
  9: 'FAQ Focused',
  10: 'Video Embed',
}

export function getTemplateName(templateId: number): string {
  const id = templateId as TemplateId
  return templateNames[id] || templateNames[1]
}
