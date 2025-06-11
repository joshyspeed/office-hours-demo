import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company Logo/Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors">
              Automate Forward
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/services" 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-slate-600 hover:text-slate-900 focus:outline-none focus:text-slate-900 transition-colors"
              aria-label="Main menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 