import Card, { CardContent } from '@/components/common/Card'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export default function StatsCard({ title, value, subtitle, trend, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            {trend && (
              <div className="mt-2 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="ml-2 text-sm text-gray-500">vs last period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="rounded-lg bg-primary-50 p-3 text-primary-600">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsTableProps {
  stats: Array<{
    slug: string
    title: string
    pageViews: number
    affiliateClicks: number
    clickRate: number
  }>
}

export function StatsTable({ stats }: StatsTableProps) {
  if (stats.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-500">No statistics available yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Page
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Views
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Click Rate
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stats.map((stat) => (
            <tr key={stat.slug} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">{stat.title}</div>
                  <div className="text-sm text-gray-500">/{stat.slug}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {stat.pageViews.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {stat.affiliateClicks.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.clickRate >= 5
                      ? 'bg-green-100 text-green-800'
                      : stat.clickRate >= 2
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {stat.clickRate.toFixed(2)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
