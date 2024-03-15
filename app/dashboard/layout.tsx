import Navigation from '../../components/Navigation';
import { getSession } from '@/lib/auth/utils';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    console.log('env', process.env.DATABASE_URL);
    console.log('port', process.env.PORT);
    //  undo this once done with dashboard coding.
    // if (!session) {
    //     redirect('/login');
    // }

    return (
        <>
            <section>
                <Navigation />
                {children}
            </section>
        </>
    );
}
