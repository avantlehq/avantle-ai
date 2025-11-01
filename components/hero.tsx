"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="hero-gradient py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Privacy by Design.{" "}
            <span className="text-primary">Intelligence by Default.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Build the operating system for private AI — one core that powers infinite local agents.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="https://notes.avantle.ai">
              <Button size="lg" className="text-lg px-8 py-6 w-full">Launch Notes.Avantle.ai</Button>
            </Link>
            <Link href="/manifesto">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full">Read the Manifesto</Button>
            </Link>
          </div>

          <div className="bg-card border rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-sm text-muted-foreground mb-4">System UI Preview</div>
            <div className="bg-muted rounded p-6 text-left">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-sm">
                <div className="text-primary">$ avantle status</div>
                <div className="text-green-400">✓ Local AI Core: Active</div>
                <div className="text-green-400">✓ Encryption: AES-256</div>
                <div className="text-green-400">✓ Data Residency: Local</div>
                <div className="text-muted-foreground">✗ Network: Offline by design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}