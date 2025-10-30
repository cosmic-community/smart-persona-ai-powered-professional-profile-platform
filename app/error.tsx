'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">An error occurred while loading this page.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary px-6 py-2"
          >
            Try again
          </button>
          <Link href="/" className="btn btn-secondary px-6 py-2">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}