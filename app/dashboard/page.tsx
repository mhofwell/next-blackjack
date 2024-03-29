import PoolFrame from '@/components/PoolFrame';
import Footer from '@/components/Footer';
import OverviewDataBanner from '../../components/OverviewDataBanner';
import { Metadata } from 'next';
import { getSession } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';
import { getClient } from '@/lib/apollo/client';
import { UPDATE_POOL_DATA_MUTATION } from '@/lib/graphql/queries';

export const dynamic = 'force-dynamic';

type OverviewData = {
    activePools: number;
    totalTreasury: number;
    activeEntries: number;
    totalEntries: number;
    gameweek: number;
    // add currency type
};

export const metadata: Metadata = {
    title: 'Dasbhoard',
};

export default async function Dashboard() {
    const session = await getSession();

    // change this to !auth where we get the session and check the db for the user's session.
    if (!session) {
        redirect('/login');
    }

    const id: string = session.cuid;

    const { data, errors } = await getClient().mutate({
        mutation: UPDATE_POOL_DATA_MUTATION,
        variables: {
            input: id,
        },
    });

    if (errors) {
        console.error('errors', errors);
    }

    const overview: OverviewData = data?.updatePoolData || {};

    return (
        <div className="h-screen">
            <section className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        {errors ? (
                            <h1>App not available.</h1>
                        ) : (
                            <OverviewDataBanner overview={overview} />
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <div>
                            <PoolFrame />
                        </div>
                    </div>
                    <div className="w-full">
                        <Footer />
                    </div>
                </div>
            </section>
        </div>
    );
}
