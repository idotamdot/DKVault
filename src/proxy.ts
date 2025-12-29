// src/proxy.ts
import { NextResponse, NextRequest } from 'next/server';

export function proxy(request: NextRequest) { // Changed from 'middleware' to 'proxy'
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};