import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // You can add basic auth or session checks here later
  return NextResponse.next()
}