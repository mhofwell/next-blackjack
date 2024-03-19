import { Metadata } from 'next';
import PoolFrame from '@/components/PoolFrame';
import Footer from '@/components/Footer';
import OverviewDataBanner from '../../components/OverviewDataBanner';
import { getSession } from '@/lib/auth/utils';
import { getOverviewData } from '@/lib/actions/getOverviewData';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Dasbhoard',
};

export const dynamic = 'force-dynamic';

async function updatePoolData(id: string) {
    const mutation = gql`
        mutation Mutation($input: String!) {
            updatePoolData(input: $input) {
                status
                errors
            }
        }
    `;

    const variables = {
        input: id,
    };

    const updateStatus = await getClient().mutate({
        mutation,
        variables,
        fetchPolicy: 'no-cache', // this is important to get the latest data
    });
}

export default async function Dashboard() {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    const id = session.cuid;

    // initialze the game state
    updatePoolData(id);

    // server action to get the data for the PoolSelector.
    const overviewData = await getOverviewData(id);

    return (
        <div className="h-screen">
            <section className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <OverviewDataBanner
                            overviewData={overviewData.overview}
                        />
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
