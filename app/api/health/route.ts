import { NextResponse } from 'next/server'
import { getVersionInfo } from '../../../lib/version'

export async function GET() {
  try {
    const versionInfo = getVersionInfo()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'avantle-ai',
      version: versionInfo.version,
      versionName: versionInfo.name,
      buildDate: versionInfo.buildDate
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 500 }
    )
  }
}