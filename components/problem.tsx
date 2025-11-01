"use client"

import { Separator } from "@/components/ui/separator"

export function Problem() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">No backend. No telemetry. No compromise.</strong> Every AI assistant today requires sending your data to external servers, creating privacy risks and vendor lock-in that shouldn&apos;t exist.
          </p>
          
          <Separator className="my-8" />
          
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">European by values — GDPR-native, transparent, free from hyperscalers.</strong> We&apos;re building AI that respects your sovereignty, keeps your data local, and never phones home.
          </p>
        </div>
      </div>
    </section>
  )
}