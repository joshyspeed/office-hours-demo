import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIPlayground from '@/components/AIPlayground'

export default function AIDemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              AI-Powered Automation Demo
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the power of AI automation firsthand. Try our intelligent assistant that can help with various business tasks, content generation, and process optimization.
            </p>
          </div>

          {/* AI Playground Component */}
          <AIPlayground />

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Content Generation</h3>
              <p className="text-slate-600">Generate marketing copy, emails, proposals, and other business content instantly.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Process Optimization</h3>
              <p className="text-slate-600">Analyze workflows and get AI-powered recommendations for efficiency improvements.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Instant Automation</h3>
              <p className="text-slate-600">Get immediate solutions for repetitive tasks and business process automation.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 