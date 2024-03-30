'use server';
import SERVER_URL from '@/config';

export async function getServerCredentials() {
    // this server action has access to server env vars and can make requests
    return SERVER_URL;
}
