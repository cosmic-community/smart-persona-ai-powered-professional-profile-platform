import Link from 'next/link'
import { Home, Users, Sparkles, Layout, BarChart3 } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 py-3">
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <Link href="/profiles" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Profiles</span>
          </Link>
          <Link href="/templates" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <Layout className="h-4 w-4" />
            <span className="text-sm font-medium">Templates</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Admin</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}