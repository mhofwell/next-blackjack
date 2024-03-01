import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/utils';

export default async function Home() {
    
    const session = await getSession();

    console.log('session', session);

    return (
        <main className="flex h-screen">
            {session ? redirect('/dashboard') : redirect('/login')}
        </main>
    );
}
