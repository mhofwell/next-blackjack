'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { useState, useEffect } from 'react';

const data = {
    id: '1',
    name: 'Pool 1',
    entryFee: 15,
    treasury: 300.21,
    active: 8,
    bust: 3,
    inactive: 3,
    eliminated: 8,
    totalPlayers: 11,
    gameweek: 29,
};

export default function PoolBanner() {
    const poolId = useAppSelector((state) => state.poolReducer.data.active);

    const [pool, setPool] = useState(data);

    const stats = [
        { name: 'Gameweek ', value: pool.gameweek, unit: 'OK' },
        { name: 'Total Players', value: pool.totalPlayers },
        { name: 'Entry Fee', value: `$${pool.entryFee}`, unit: 'CAD' },
        { name: 'Treasury', value: `$${pool.treasury}`, unit: 'CAD' },
        { name: 'Active', value: pool.active },
        { name: 'Bust', value: pool.bust },
        { name: 'Inactive', value: pool.inactive },
        { name: 'Eliminated', value: pool.eliminated },
    ];

    useEffect(() => {
        // use the poolId to call a server action to get the pool data
        console.log('PoolId', poolId);
        // set the pool to the data returned from the server
    }, [poolId]);

    return (
        <div className="bg-gray-900 py-5 border border-gray-800 rounded-xl">
            <div className="mx-auto max-w-7xl">
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
            </div>
        </div>
    );
}
