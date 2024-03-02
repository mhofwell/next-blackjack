import { NextRequest } from 'next/server';
import { updateSession } from './lib/auth/utils';

export async function middleware(request: NextRequest) {
    // add updates to the middleware to check for session and then boot if no session
    return await updateSession(request);
}
