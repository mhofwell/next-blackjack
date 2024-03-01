import Navigation from '../../components/Navigation';
import { getSession } from '@/lib/auth/utils';

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    let id = 'Hof';

    // if (!session) {
    //     redirect('/login');
    // } else {
    //     id = session.cuid;
    // }

    return (
        <section>
            <Navigation username={id} />
            {children}
        </section>
    );
}
