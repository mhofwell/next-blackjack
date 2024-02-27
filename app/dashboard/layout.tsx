import { redirect } from 'next/navigation';
import Navigation from '../../components/Navigation';
import { getSession } from '@/lib/auth/utils';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    console.log('session', session);
    let id;

    if (!session) {
        redirect('/login');
    } else {
        id = session.cuid;
    }

    return (
        <section>
            <Navigation username={id} />
            {children}
        </section>
    );
}

export const dynamic = 'force-dynamic';
