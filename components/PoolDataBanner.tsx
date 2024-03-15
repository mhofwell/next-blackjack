'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { useState, useEffect } from 'react';
import { getPoolBannerData } from '@/lib/actions/getPoolBannerData';
import Spinner from './UI/spinner';

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

const emptyState = {
    id: '',
    name: '',
    entryFee: 0,
    treasury: 0,
    fee: 0,
    active: 0,
    bust: 0,
    inactive: 0,
    eliminated: 0,
    total: 0,
    gameweek: 0,
};

export default function PoolBanner() {
    const poolState = useAppSelector((state) => state.poolReducer.data);
    const [loading, setLoading] = useState(false);
    const [pool, setPool] = useState<PoolBannerData>(emptyState);

    let stats = [
        { name: 'Gameweek ', value: pool.gameweek, unit: 'OK' },
        { name: 'Total Entries', value: pool.total },
        { name: 'Entry Fee', value: `$${pool.fee}`, unit: 'CAD' },
        { name: 'Treasury', value: `$${pool.treasury}`, unit: 'CAD' },
        { name: 'Active', value: pool.active },
        { name: 'Bust', value: pool.bust },
        { name: 'Inactive', value: pool.inactive },
        { name: 'Eliminated', value: pool.eliminated },
    ];

    async function fetchPoolBannerData(poolId: string) {
        setLoading(true);
        const response = await getPoolBannerData(poolId);
        setPool(response.bannerData);
        setLoading(false);
    }

    useEffect(() => {
        if (poolState.active === '') {
            return;
        }

        // create the API route to get this data
        fetchPoolBannerData(poolState.active);

        // set the pool to the data returned from the server
    }, [poolState]);

    return (
        <div className="bg-gray-900 py-5 border border-gray-800 rounded-xl">
            <div className="mx-auto max-w-7xl">
                {loading ? (
                    // Render a loading spinner or some other placeholder
                    <div className="flex m-16 items-center justify-center ">
                        <Spinner />
                    </div>
                ) : (
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
                                    {stat.unit === 'OK' ? (
                                        <div className="py-1">
                                            {/* <Badge color="lime">Great!</Badge> */}
                                        </div>
                                    ) : stat.unit ? (
                                        <div className="py-2">
                                            <span className="text-sm text-gray-400">
                                                {stat.unit}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
