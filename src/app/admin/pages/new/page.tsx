export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PageCreateForm from '@/components/admin/PageCreateForm'

export default async function NewPagePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
        <p className="mt-1 text-sm text-gray-500">
          Set up a new affiliate landing page
        </p>
      </div>
      <PageCreateForm />
    </div>
  )
}
