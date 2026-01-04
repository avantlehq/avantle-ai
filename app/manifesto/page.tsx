import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ManifestoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dpia-blue/10 border border-dpia-blue/20">
              <div className="w-2 h-2 rounded-full bg-dpia-blue animate-pulse"></div>
              <span className="text-sm font-medium text-dpia-blue">Manifesto</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Coming Soon
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Our manifesto for privacy-first technology is being crafted with care.
            </p>
          </div>

          {/* Content Section */}
          <div className="space-y-6 pt-8">
            <div className="w-16 h-16 rounded-lg bg-dpia-blue/20 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-dpia-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <p className="text-muted-foreground max-w-lg mx-auto">
              Stay tuned as we prepare to share our vision for a privacy-first future 
              where technology serves people, not the other way around.
            </p>
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-dpia-blue text-white rounded-lg hover:bg-dpia-blue/80 transition-colors font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  )
}
