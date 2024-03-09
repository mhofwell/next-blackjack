import { Metadata } from 'next';
import PoolFrame from '@/components/PoolFrame';
import Footer from '@/components/Footer';
import OverviewDataBanner from '../../components/OverviewDataBanner';
import gql from 'graphql-tag';
import { getClient } from '@/lib/apollo/client';
import { getSession } from '@/lib/auth/utils';
import { testUser } from '@/test/testdata';

export const metadata: Metadata = {
    title: 'Dasbhoard',
};

async function getOverviewData(id: string) {
    const query = gql`
        query Overview($input: String!) {
            overview(input: $input) {
                status
                errors
                overview {
                    activePools
                    gameweek
                    activeEntries
                    totalEntries
                    totalTreasury
                }
            }
        }
    `;

    const variables = {
        input: id,
    };

    try {
        const { data } = await getClient().query({
            query: query,
            variables: variables,
        });

        return data.overview;
    } catch (error: any) {
        console.error(error);
        return {
            status: 400,
            errors: [error.message],
            overview: {
                activePools: 0,
                totalTreasury: 0,
                activeEntries: 0,
                totalEntries: 0,
                gameweek: 0,
            },
        };
    }
}
export default async function Dashboard() {
    const session = await getSession();
    const id = testUser;

    // server action to set status and G, OG, NG for each entry. Save to DB.
    // const result = await initialize();

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
