import { Fragment } from 'react';
import { Avatar } from '../UI/avatar';
import { Badge } from '../UI/badge';

const locations = [
    {
        name: 'Active',
        people: [
            {
                avatar: 'mh.png',
                name: 'Lindsay Walton',
                net_goals: '11',
                status: 'lindsay.walton@example.com',
                paid: 'Member',
            },
            {
                avatar: 'mh.png',
                name: 'Courtney Henry',
                net_goals: '11',
                status: 'courtney.henry@example.com',
                paid: 'Admin',
            },
        ],
    },
    {
        name: 'Eliminated',
        people: [
            {
                avatar: 'mh.png',
                name: 'Lindsay Walton',
                net_goals: '11',
                status: 'lindsay.walton@example.com',
                paid: 'Member',
            },
            {
                avatar: 'mh.png',
                name: 'Courtney Henry',
                net_goals: '11',
                status: 'courtney.henry@example.com',
                paid: 'Admin',
            },
        ],
    },
    // More people...
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function GroupedTable() {
    return (
        <div className="px-4 sm:px-6 mt-5 lg:px-8">
            <div className="sm:flex  sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base  leading-6 text-zinc-">
                        All of the players in this pool.
                    </h1>
                </div>
            </div>
            <div className="mt-2 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full">
                            <thead className="">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-1 text-left text-xs text-zinc-400 sm:pl-3"
                                    ></th>
                                    <th
                                        scope="col"
                                        className="py-1 text-left text-xs text-zinc-400 sm:pl-3"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-1 text-left text-xs text-zinc-400"
                                    >
                                        Net Goals
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-1 text-left text-xs text-zinc-400"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-1 text-left text-xs text-zinc-400"
                                    >
                                        Paid
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-1 pl-3 pr-4 sm:pr-3"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {locations.map((location) => (
                                    <Fragment key={location.name}>
                                        <tr className="border-t border-zinc-400">
                                            <Badge
                                                key={location.name}
                                                className="mt-3 w-full"
                                                color={
                                                    location.name === 'active'
                                                        ? 'lime'
                                                        : 'red'
                                                }
                                            >
                                                {location.name.toUpperCase()}
                                            </Badge>
                                        </tr>
                                        {location.people.map(
                                            (person, personIdx) => (
                                                <tr
                                                    key={person.avatar}
                                                    className={classNames(
                                                        personIdx === 0
                                                            ? 'border-gray-300'
                                                            : 'border-gray-200',
                                                        'border-t'
                                                    )}
                                                >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-3">
                                                        <Avatar
                                                            className="size-6 mt-1 pb-10"
                                                            src="mh.png"
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-3">
                                                        {person.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                                                        {person.net_goals}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                                                        {person.status}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                                                        {person.paid}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs font-medium sm:pr-3">
                                                        <a
                                                            href="#"
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            View
                                                            <span className="sr-only">
                                                                , {person.name}
                                                            </span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
