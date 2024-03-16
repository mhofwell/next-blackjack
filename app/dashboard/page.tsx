import { Metadata } from 'next';
import PoolFrame from '@/components/PoolFrame';
import Footer from '@/components/Footer';
import OverviewDataBanner from '../../components/OverviewDataBanner';
import { getSession } from '@/lib/auth/utils';
import { testUser } from '@/test/testdata';
import { getOverviewData } from '@/lib/actions/getOverviewData';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';

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
    const id = session.cuid;
    // const id = testUser;

    // server action to set status and G, OG, NG for each entry. Save to DB. or Save to component/Redux state. Maybe we should move this into the banner
    // it can create a loading state for the overview, and it won't take that long to load all-up.
    // that is not the right result for someone who has 125 pools with average 50 people each. That won't work.
    updatePoolData(id);

    // server action to get the data for the PoolSelector.
    const overviewData = await getOverviewData(id);

    return (
        <div className="h-screen">
            <section className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        {/* server action to grab the data we need from api and database to populate this */}
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
