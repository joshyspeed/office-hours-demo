import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Streamline Your Business with{' '}
            <span className="text-slate-700 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              Intelligent Automation
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            hell yeah!
          </p>

          {/* Call-to-Action Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Schedule a Free Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Supporting Visual Elements */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full opacity-20 blur-3xl"></div>
            </div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Boost Efficiency</h3>
                  <p className="text-slate-600">Automate repetitive tasks and streamline workflows</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Drive Growth</h3>
                  <p className="text-slate-600">Scale your operations with intelligent solutions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Optimize Performance</h3>
                  <p className="text-slate-600">Reduce costs and improve operational excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 