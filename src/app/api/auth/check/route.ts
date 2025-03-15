import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth/utils';

// Add this export to mark the route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const auth = await isAuthenticated(request);
    
    if (!auth) {
      console.log('Authentication failed - no valid token');
      return new NextResponse(null, { status: 401 });
    }
    
    return new NextResponse(null, { status: 200 });
  } catch (error: any) {  // Type as 'any' since we don't know the exact error type
    // More detailed error logging
    console.error('Auth check error details:', {
      name: error?.name || 'UnknownError',
      message: error?.message || 'An unknown error occurred',
      code: error?.code || 'UNKNOWN_ERROR'
    });
    
    // If it's specifically a JWT verification error, return 401
    if (error?.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
      return new NextResponse(null, { status: 401 });
    }
    
    return new NextResponse(null, { status: 500 });
  }
}
