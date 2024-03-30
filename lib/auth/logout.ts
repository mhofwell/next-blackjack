'use server';
import { cookies } from 'next/headers';


export async function logout() {
    // Destroy the session
    cookies().set('plbj-session', '', { expires: new Date(0) });
}
