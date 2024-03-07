import { NextRequest } from 'next/server';
import { updateSession } from './lib/auth/utils';

export async function middleware(request: NextRequest) {
    // lets get the request and check if the session is valid
    // if the session is valid then we can update the session
    // add updates to the middleware to check for session and then boot if no session
    return await updateSession(request);
}
