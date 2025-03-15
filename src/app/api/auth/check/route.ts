import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth/utils';

export async function GET(request: NextRequest) {
  try {
    const auth = await isAuthenticated(request);
    
    if (!auth) {
      console.log('Authentication failed - no valid token');
      return new NextResponse(null, { status: 401 });
    }
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // More detailed error logging
    console.error('Auth check error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    // If it's specifically a JWT verification error, return 401
    if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
      return new NextResponse(null, { status: 401 });
    }
    
    return new NextResponse(null, { status: 500 });
  }
}
