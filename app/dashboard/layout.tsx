import Navigation from '../../components/Navigation';
import { getSession } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    //  undo this once done with dashboard coding.
    if (!session) {
        redirect('/login');
    }

    return (
        <>
            <section>
                <Navigation />
                {children}
            </section>
        </>
    );
}
