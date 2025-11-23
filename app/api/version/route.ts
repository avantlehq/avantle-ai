import { NextResponse } from 'next/server'
import { getVersionInfo, CHANGELOG } from '../../../lib/version'

export async function GET() {
  try {
    const versionInfo = getVersionInfo()
    
    return NextResponse.json({
      success: true,
      data: {
        ...versionInfo,
        changelog: CHANGELOG
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch version information' 
      },
      { status: 500 }
    )
  }
}