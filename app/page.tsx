import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/utils';

export default async function Home() {
    
    const session = await getSession();

    return (
        <main className="flex h-screen">
            {session ? redirect('/dashboard') : redirect('/login')}
        </main>
    );
}
