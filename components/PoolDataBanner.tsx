'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { POOL_BANNER_DATA_QUERY } from '@/lib/graphql/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import ErrorComponent from '@/app/dashboard/error';

type PoolBannerData = {
    id: string;
    name: string;
    entryFee: number;
    treasury: number;
    fee: number;
    active: number;
    bust: number;
    inactive: number;
    eliminated: number;
    total: number;
    gameweek: number;
};

type QueryResponse = {
    poolBannerData: PoolBannerData;
};

export default function PoolDataBanner() {
    const poolState = useAppSelector((state) => state.poolReducer.data);

    const { data, error } = useSuspenseQuery<QueryResponse>(
        POOL_BANNER_DATA_QUERY,
        {
            errorPolicy: 'all',
            variables: { input: poolState.active },
        }
    );

    if (error) {
        return (
            <ErrorComponent
                error={error}
                // add reset function
                reset={() => {}}
            />
        );
    }

    const poolBannerData: PoolBannerData | undefined = data?.poolBannerData;

    const stats = [
        {
            name: 'Gameweek ',
            value: poolBannerData?.gameweek || 0,
        },
        { name: 'Total Entries', value: poolBannerData?.total || 0 },
        {
            name: 'Entry Fee',
            value: poolBannerData?.fee ? `$${poolBannerData.fee}` : '$0',
            unit: 'CAD',
        },
        {
            name: 'Treasury',
            value: poolBannerData?.treasury
                ? `$${poolBannerData.treasury}`
                : '$0',
            unit: 'CAD',
        },
        { name: 'Active', value: poolBannerData?.active || 0 },
        { name: 'Bust', value: poolBannerData?.bust || 0 },
        { name: 'Inactive', value: poolBannerData?.inactive || 0 },
        { name: 'Eliminated', value: poolBannerData?.eliminated || 0 },
    ];

    return (
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="bg-gray-900 px-4 py-2 sm:px-6 lg:px-8"
                >
                    <p className="text-sm font-medium leading-6 text-gray-400">
                        {stat.name}
                    </p>
                    <div className=" mt-2 flex gap-x-2">
                        <p>
                            <span className="text-2xl font-semibold tracking-tight text-white">
                                {stat.value}
                            </span>
                        </p>

                        <div className="py-2">
                            <span className="text-sm text-gray-400">
                                {stat.unit}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
