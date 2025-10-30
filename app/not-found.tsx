import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <Link href="/" className="btn btn-primary px-6 py-2">
          Go home
        </Link>
      </div>
    </div>
  )
}