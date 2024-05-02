'use server';
import ErrorComponent from '@/app/dashboard/error';
import Skeleton from './UI/skeleton-grid';
import { getClient } from '@/lib/apollo/client';
import { UPDATE_POOL_DATA_MUTATION } from '@/lib/graphql/queries';

type OverviewData = {
    activePools: number;
    totalTreasury: number;
    activeEntries: number;
    totalEntries: number;
    gameweek: number;
    // add currency type
};

export default async function OverviewBanner({ id }: { id: string }) {
    
    const { data, errors } = await getClient().mutate({
        mutation: UPDATE_POOL_DATA_MUTATION,
        variables: {
            input: id,
        },
    });

    const overview: OverviewData = data?.updatePoolData;

    const stats = [
        { name: 'Active Pools', value: overview?.activePools || 0 },
        { name: 'Gameweek', value: overview?.gameweek || 0 },
        {
            name: 'Active Entries',
            value: overview
                ? `${overview?.activeEntries}/${overview?.totalEntries}`
                : 0,
        },
        {
            name: 'Total Treasury',
            value: overview ? `$${overview?.totalTreasury}` : 0,
            unit: 'CAD',
        },
    ];

    if (errors) {
        return (
            <ErrorComponent
                error={errors}
                // add reset function
                reset={() => {}}
            />
        );
    }

    return !data ? (
        <div className="flex justify-center items-center w-full h-full">
            <Skeleton />
        </div>
    ) : (
        <div className="dark:bg-gray-900 bg-white ">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-2xl pb-5 font-semibold tracking-tight text-black dark:text-white">
                    Overview
                </h2>
                <div className="border dark:bg-gray-900 bg-white border-gray-800 p-5 rounded-xl">
                    <div className="grid grid-cols-2 gap-px dark:bg-gray-800 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="dark:bg-gray-900 bg-white  px-4 py-6 sm:px-6 lg:px-8"
                            >
                                <p className="text-sm font-medium leading-6 text-gray-500">
                                    {stat.name}
                                </p>
                                <div className=" mt-2 flex gap-x-2">
                                    <p>
                                        <span className="text-4xl font-semibold tracking-tight text-gray-600 dark:text-white">
                                            {stat.value}
                                        </span>
                                    </p>
                                    {stat.unit ? (
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
