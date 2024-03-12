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
import { useAppSelector } from '@/lib/store/hooks';
import { useState, useEffect } from 'react';
import { getPoolEntries } from '@/lib/actions/getPoolEntries';
import { getInitials } from '@/lib/tools/getInitials';

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

async function fetchEntries(
    poolId: string,
    setEntries: any,
    entryData: Entry[] = []
) {
    const response = await getPoolEntries(poolId);
    entryData = response.entries;

    setEntries(entryData);
}

export default function EntryTable() {
    const poolState = useAppSelector((state) => state.poolReducer.data);
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

    useEffect(() => {
        if (poolState.active === '') {
            return;
        }
        let newEntries: Entry[] = [];

        fetchEntries(poolState.active, setEntries, newEntries);
    }, [poolState.active]);

    return (
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
                    <TableRow key={entry.id} href={'#'}>
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
