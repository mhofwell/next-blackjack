import { Badge } from './UI/badge';

const stats = [
    { name: 'Gameweek ', value: '29', unit: 'OK' },
    { name: 'Total Players', value: '11' },
    { name: 'Entry Fee', value: '$15', unit: 'CAD' },
    { name: 'Treasury', value: '$300.00', unit: 'CAD' },
    { name: 'Active', value: '8', unit: 'OK' },
    { name: 'Bust', value: '3' },
    { name: 'Inactive', value: '3' },
    { name: 'Lost', value: '8', unit: 'OK' },
];

export default async function Banner() {
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
