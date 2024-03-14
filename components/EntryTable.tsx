'use client';
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
import { useState, useEffect } from 'react';
import { getPoolEntries } from '@/lib/actions/getPoolEntries';
import { getInitials } from '@/lib/tools/getInitials';
import Spinner from './UI/spinner';
import { setActiveEntry } from '@/lib/store/slices/entry-slice';

type AllEntriesUser = {
    id: string;
    username: string;
};

type Entry = {
    id: string;
    net_goals: number;
    status: string;
    paid: string;
    user: AllEntriesUser;
};

export default function EntryTable() {
    const poolState = useAppSelector((state) => state.poolReducer.data);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    let [entries, setEntries] = useState<Entry[]>([
        {
            id: '',
            net_goals: 0,
            status: 'INACTIVE',
            paid: '',
            user: {
                id: '',
                username: '',
            },
        },
    ]);

    async function fetchEntries(poolId: string) {
        setLoading(true);
        const response = await getPoolEntries(poolId);

        setEntries(response.entries);
        setLoading(false);
    }

    async function handleEntryClick(
        event: React.MouseEvent<HTMLTableRowElement>
    ) {
        const payload: string = event.currentTarget.id;
        dispatch(setActiveEntry(payload));
    }

    useEffect(() => {
        // early return for inactive pool state
        if (poolState.active === '') {
            return;
        }

        // get the pool data
        fetchEntries(poolState.active);
    }, [poolState.active]);

    return loading ? (
        <div className="flex items-center justify-center min-h-[600px]">
            <Spinner />
        </div>
    ) : (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Avatar</TableHeader>
                    <TableHeader>Username</TableHeader>
                    <TableHeader>Net Goals</TableHeader>
                    <TableHeader>Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow
                        key={entry.id}
                        onClick={handleEntryClick}
                        id={entry.id}
                        className="hover:bg-gray-800 cursor-pointer"
                    >
                        <TableCell>1</TableCell>
                        <TableCell>
                            <Avatar
                                initials={getInitials(entry.user.username)}
                                className="size-6"
                                // src={entry.avatar}
                                alt={entry.user.username}
                            />
                        </TableCell>
                        <TableCell className="font-sm">
                            {entry.user.username}
                        </TableCell>
                        <TableCell>{entry.net_goals}</TableCell>
                        <TableCell className="text-zinc-500">
                            <Badge
                                color={
                                    entry.status === 'ACTIVE'
                                        ? 'lime'
                                        : entry.status === 'BUST'
                                        ? 'amber'
                                        : entry.status === 'INACTIVE'
                                        ? 'zinc'
                                        : 'red'
                                }
                            >
                                {entry.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
