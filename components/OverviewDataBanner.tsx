import { Badge } from './UI/badge';
import { getSession } from '@/lib/auth/utils';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';

type OverviewResponse = {
    status: number;
    errors: string[];
    overview: OverviewData;
};

type OverviewData = {
    activePools: number;
    totalTreasury: number;
    activePlayers: number;
    totalPlayers: number;
    gameweek: number;
};

export default async function OverviewBanner() {
    const session = await getSession();

    let id: string;

    session ? (id = session.cuid) : (id = '');

    let overviewData: OverviewResponse = {
        status: 0,
        errors: [],
        overview: {
            activePools: 0,
            totalTreasury: 0,
            activePlayers: 0,
            totalPlayers: 0,
            gameweek: 0,
        },
    };

    // pull this function out into the parent server component for parallel fetching.s
    async function getOverviewData() {
        const query = gql`
            query Overview($input: String!) {
                overview(input: $input) {
                    status
                    errors
                    overview {
                        totalTreasury
                        activePools
                        gameweek
                        activePlayers
                        totalPlayers
                    }
                }
            }
        `;

        const variables = {
            input: id,
        };

        const { data } = await getClient().query({
            query: query,
            variables: variables,
        });

        overviewData = data.overview;

        return overviewData;
    }

    const data = await getOverviewData();

    const stats = [
        { name: 'Active Pools', value: data.overview.activePools },
        { name: 'Gameweek', value: data.overview.gameweek },
        {
            name: 'Active Players',
            value: `${data.overview.activePlayers}/${data.overview.totalPlayers}`,
            unit: 'OK',
        },
        {
            name: 'Total Treasury',
            value: `$${data.overview.totalTreasury}`,
            unit: 'CAD',
        },
    ];

    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-2xl pb-5 font-semibold tracking-tight text-white">
                    Overview
                </h2>
                <div className="border border-gray-800 p-5 rounded-xl">
                    <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
                            >
                                <p className="text-sm font-medium leading-6 text-gray-400">
                                    {stat.name}
                                </p>
                                <div className=" mt-2 flex gap-x-2">
                                    <p>
                                        <span className="text-4xl font-semibold tracking-tight text-white">
                                            {stat.value}
                                        </span>
                                    </p>
                                    {stat.unit === 'OK' ? (
                                        <div className="py-[10px]">
                                            <Badge color="fuchsia">
                                                All Paid
                                            </Badge>
                                        </div>
                                    ) : stat.unit ? (
                                        <div className="py-4">
                                            <span className="text-sm text-gray-400">
                                                {stat.unit}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
