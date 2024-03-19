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

let emptyStats = [
    { name: 'Gameweek ', value: 0, unit: 'OK' },
    { name: 'Total Entries', value: 0 },
    { name: 'Entry Fee', value: `$0`, unit: 'CAD' },
    { name: 'Treasury', value: `$0`, unit: 'CAD' },
    { name: 'Active', value: 0 },
    { name: 'Bust', value: 0 },
    { name: 'Inactive', value: 0 },
    { name: 'Eliminated', value: 0 },
];

export default function PoolBanner() {
    const poolState = useAppSelector((state) => state.poolReducer.data);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any[]>(emptyStats);

    async function fetchPoolBannerData(poolId: string) {
        setLoading(true);
        const response = await getPoolBannerData(poolId);
        const newStats = [
            {
                name: 'Gameweek ',
                value: response.bannerData.gameweek,
                unit: 'OK',
            },
            { name: 'Total Entries', value: response.bannerData.total },
            {
                name: 'Entry Fee',
                value: `$${response.bannerData.fee}`,
                unit: 'CAD',
            },
            {
                name: 'Treasury',
                value: `$${response.bannerData.treasury}`,
                unit: 'CAD',
            },
            { name: 'Active', value: response.bannerData.active },
            { name: 'Bust', value: response.bannerData.bust },
            { name: 'Inactive', value: response.bannerData.inactive },
            { name: 'Eliminated', value: response.bannerData.eliminated },
        ];
        setStats(newStats);
        setLoading(false);
    }

    useEffect(() => {
        if (poolState.active === '') {
            return;
        }

        fetchPoolBannerData(poolState.active);
    }, [poolState.active]);

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
