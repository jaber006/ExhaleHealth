import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-light text-[#0D6B5E]/20 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
