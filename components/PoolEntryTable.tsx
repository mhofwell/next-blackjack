'use client';
import EntryCard from './EntryCard';
import ErrorComponent from '@/app/dashboard/error';
import React from 'react';
import Skeleton from './UI/skeleton-large';
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './UI/table';
import { Badge } from './UI/badge';
import { Avatar } from './UI/avatar';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { getInitials } from '@/lib/tools/getInitials';
import { serverActionQuery } from '@/lib/actions/serverActionQuery';
import { ApolloError } from '@apollo/client';
import { POOL_ENTRIES_QUERY } from '@/lib/graphql/queries';
import { useState, useEffect } from 'react';
import { setActiveEntry } from '@/lib/store/slices/entry-slice';

type AllEntriesUser = {
    id: string;
    username: string;
};

type Entry = {
    id: string;
    goals: number;
    own_goals: number;
    net_goals: number;
    status: string;
    paid: string;
    user: AllEntriesUser;
};

type PoolState = {
    active: string;
};

async function fetchData(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<ApolloError | null>>,
    setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>,
    poolState: PoolState
) {
    setError(null);
    setLoading(true);
    const variables = {
        input: poolState.active,
    };

    const { data, error } = await serverActionQuery(
        POOL_ENTRIES_QUERY,
        variables
    );

    if (data) {
        setEntries(data.poolEntries);
    }

    if (error) {
        setError(error);
    }
    setLoading(false);
}

export default function PoolEntryTable() {
    const poolState = useAppSelector((state) => state.poolReducer.data);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApolloError | null>(null);
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [shareIcon, setShareIcon] = useState<string>('');

    const handleShare = () => {
        const url = window.location.origin + `/pool/${poolState.active}`;
        toast.success('Copied to clipboard!');
        navigator.clipboard.writeText(url);
    };

    let rank = 1;

    useEffect(() => {
        // Ensure window is defined
        if (typeof window !== 'undefined') {
            const isDarkMode =
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;

            setShareIcon(isDarkMode ? '/dark_share.png' : '/light_share.png');
        }
    }, []);

    useEffect(() => {
        // Ensure window is defined
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            // Check window size on mount
            handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        if (poolState.active === '') return;
        toast.promise(fetchData(setLoading, setError, setEntries, poolState), {
            loading: 'Fetching entries...',
            success: 'Entries fetched!',
            error: 'Failed to load entries.',
        });
        selectedRow && setSelectedRow(null);
    }, [poolState.active]);

    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
        const payload: string = event.currentTarget.id;
        if (payload != 'a') {
            dispatch(setActiveEntry(payload));
            setSelectedRow(selectedRow === payload ? null : payload);
        }
    };

    const componentData: Entry[] = entries || [
        {
            id: 'a',
            goals: 0,
            own_goals: 0,
            net_goals: 0,
            status: 'INACTIVE',
            paid: 'false',
            user: {
                id: '1',
                username: '',
            },
        },
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
            <div className="flex justify-center items-center w-full h-full">
                <Skeleton />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end">
                <img
                    className="size-6 mb-2"
                    style={{
                        cursor: 'pointer',
                    }}
                    src={shareIcon}
                    onClick={handleShare}
                ></img>
            </div>
            <Table
                dense
                className=" text-xs sm:text-sm [--gutter:theme(spacing.4)] sm:[--gutter:theme(spacing.6)]"
            >
                <TableHead>
                    <TableRow>
                        <TableHeader>Rank</TableHeader>
                        {!isMobile && <TableHeader>Avatar</TableHeader>}
                        <TableHeader>User</TableHeader>
                        {!isMobile && <TableHeader>G</TableHeader>}
                        {!isMobile && <TableHeader>OG</TableHeader>}
                        <TableHeader>NG</TableHeader>
                        {!isMobile && <TableHeader>EXG</TableHeader>}
                        <TableHeader>Status</TableHeader>
                        {!isMobile && <TableHeader>Paid</TableHeader>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {componentData.map((entry) => {
                        // Use the variable inside the map function
                        const currentRank = rank;

                        // Update the variable for the next iteration
                        rank++;

                        entry.net_goals === 21
                            ? (entry.status = '21!')
                            : entry.status;

                        return (
                            <React.Fragment key={entry.id}>
                                <TableRow
                                    key={entry.id}
                                    onClick={(
                                        event: React.MouseEvent<
                                            HTMLTableRowElement,
                                            MouseEvent
                                        >
                                    ) => handleRowClick(event)}
                                    id={entry.id}
                                    className="dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                                >
                                    <TableCell>
                                        {entry.net_goals >= 17 &&
                                        entry.net_goals < 21 &&
                                        currentRank !== 1
                                            ? `${currentRank} 🔥`
                                            : entry.net_goals > 29
                                            ? `${currentRank} 🤡`
                                            : currentRank === 1 &&
                                              entry.id !== 'a'
                                            ? `${currentRank} 🤩`
                                            : entry.net_goals === 21
                                            ? `${currentRank} 🃏🏆`
                                            : currentRank}
                                    </TableCell>
                                    {!isMobile && (
                                        <TableCell>
                                            <Avatar
                                                initials={
                                                    entry.user
                                                        ? getInitials(
                                                              entry.user
                                                                  .username
                                                          )
                                                        : '?'
                                                }
                                                className="size-6"
                                                // src={entry.avatar}
                                                alt={entry.user.username}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell className="text-xs sm:text-2xs">
                                        {entry.user.username}
                                    </TableCell>

                                    {!isMobile && (
                                        <TableCell style={{ width: '100px' }}>
                                            {entry.goals}
                                        </TableCell>
                                    )}
                                    {!isMobile && (
                                        <TableCell style={{ width: '100px' }}>
                                            {entry.own_goals}
                                        </TableCell>
                                    )}
                                    <TableCell style={{ width: '100px' }}>
                                        {entry.net_goals}
                                    </TableCell>
                                    {!isMobile && (
                                        <TableCell style={{ width: '100px' }}>
                                            0.6
                                        </TableCell>
                                    )}
                                    <TableCell className="text-zinc-500">
                                        <Badge
                                            className="text-xs"
                                            color={
                                                entry.status === '21!'
                                                    ? 'yellow'
                                                    : entry.status === 'ACTIVE'
                                                    ? 'lime'
                                                    : entry.status === 'BUST'
                                                    ? 'orange'
                                                    : entry.status ===
                                                      'INACTIVE'
                                                    ? 'zinc'
                                                    : 'sky'
                                            }
                                        >
                                            {entry.status}
                                        </Badge>
                                    </TableCell>
                                    {!isMobile && (
                                        <TableCell style={{ width: '100px' }}>
                                            {' '}
                                            <Badge
                                                className="text-2xs"
                                                color={
                                                    entry.paid === 'YES'
                                                        ? 'fuchsia'
                                                        : entry.status ===
                                                          'BUST'
                                                        ? 'amber'
                                                        : entry.status ===
                                                          'INACTIVE'
                                                        ? 'zinc'
                                                        : 'red'
                                                }
                                            >
                                                YES
                                            </Badge>
                                        </TableCell>
                                    )}
                                </TableRow>
                                {selectedRow === entry?.id && (
                                    <TableRow key={`${entry.id}-expanded`}>
                                        <TableCell colSpan={9}>
                                            <div className="w-full flex justify-center">
                                                <div className="border dark:bg-gray-900 bg-white dark:text-white text-black border-gray-800 p-5 rounded-xl w-full sm:w-2/3 mx-auto">
                                                    <EntryCard
                                                        id={entry.id}
                                                        rank={currentRank}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
