'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { POOL_BANNER_DATA_QUERY } from '@/lib/graphql/queries';
import { serverActionQuery } from '@/lib/actions/serverActionQuery';
import { useEffect, useState } from 'react';
import Spinner from './UI/spinner';
import toast from 'react-hot-toast';
import ErrorComponent from '@/app/dashboard/error';
import { ApolloError } from '@apollo/client';

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

type PoolState = {
    active: string;
};

async function fetchData(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<ApolloError | null>>,
    setBannerData: React.Dispatch<React.SetStateAction<PoolBannerData | null>>,
    poolState: PoolState
) {
    setError(null);
    setLoading(true);
    const variables = {
        input: poolState.active,
    };

    const { data, error } = await serverActionQuery(
        POOL_BANNER_DATA_QUERY,
        variables
    );

    if (data) {
        setBannerData(data.poolBannerData);
    }

    if (error) {
        setError(error);
    }
    setLoading(false);
}

export default function PoolDataBanner() {
    const poolState: PoolState = useAppSelector(
        (state) => state.poolReducer.data
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApolloError | null>(null);
    const [bannerData, setBannerData] = useState<PoolBannerData | null>(null);

    useEffect(() => {
        if (poolState.active === '') return;
        toast.promise(
            fetchData(setLoading, setError, setBannerData, poolState),
            {
                loading: 'Fetching data...',
                success: 'Success!',
                error: 'Failed to load pool data.',
            }
        );
    }, [poolState.active]);

    const stats = [
        {
            name: 'Gameweek ',
            value: bannerData?.gameweek || 0,
        },
        { name: 'Total Entries', value: bannerData?.total || 0 },
        {
            name: 'Entry Fee',
            value: bannerData?.fee ? `$${bannerData.fee}` : '$0',
            unit: 'CAD',
        },
        {
            name: 'Treasury',
            value: bannerData?.treasury ? `$${bannerData.treasury}` : '$0',
            unit: 'CAD',
        },
        { name: 'Active', value: bannerData?.active || 0 },
        { name: 'Bust', value: bannerData?.bust || 0 },
        { name: 'Inactive', value: bannerData?.inactive || 0 },
        { name: 'Eliminated', value: bannerData?.eliminated || 0 },
    ];

    if (error) {
        return (
            <ErrorComponent
                error={error}
                // add reset function
                reset={() => {}}
            />
        );
    }

    if (loading) {
        return (
            <div className="flex m-16 justify-center items-center h-full">
                <Spinner />
            </div>
        );
    }

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
