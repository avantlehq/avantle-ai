"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MissionVision() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mission & Vision</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build the operating system for private AI — one core that powers infinite local agents.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By 2030, every human carries an encrypted AI brain — an assistant that learns privately, serves loyally, and never phones home.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}