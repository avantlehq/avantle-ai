import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Avantle.ai
          </h1>
          
          <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground">
              Privacy by Design.
            </p>
            
            <p>
              No tracking. No telemetry. No compromises.
            </p>
            
            <p>
              Built on European values — GDPR-native, fully transparent, and independent from big tech hyperscalers.
            </p>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  )
}