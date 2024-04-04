'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './UI/table';
import ErrorComponent from '@/app/dashboard/error';
import { Badge } from './UI/badge';
import { Avatar } from './UI/avatar';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { getInitials } from '@/lib/tools/getInitials';
import { setActiveEntry } from '@/lib/store/slices/entry-slice';
import { useSuspenseQuery } from '@apollo/client';
import { POOL_ENTRIES_QUERY } from '@/lib/graphql/queries';

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

interface QueryResponse {
    poolEntries: Entry[];
}

const emptyState = [
    {
        id: '1',
        net_goals: 0,
        status: 'INACTIVE',
        paid: 'false',
        user: {
            id: '1',
            username: '',
        },
    },
];

export default function EntryTable() {
    const poolState = useAppSelector((state) => state.poolReducer.data);
    const dispatch = useAppDispatch();

    const { data, error } = useSuspenseQuery<QueryResponse>(
        POOL_ENTRIES_QUERY,
        {
            errorPolicy: 'all',
            variables: { input: poolState.active },
            fetchPolicy: 'no-cache',
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

    const entries: Entry[] = data?.poolEntries || emptyState;

    async function handleEntryClick(
        event: React.MouseEvent<HTMLTableRowElement>
    ) {
        const payload: string = event.currentTarget.id;
        dispatch(setActiveEntry(payload));
    }

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
                    <TableRow
                        key={entry.id}
                        onClick={handleEntryClick}
                        id={entry.id}
                        className="hover:bg-gray-800 cursor-pointer"
                    >
                        <TableCell>1</TableCell>
                        <TableCell>
                            <Avatar
                                initials={
                                    entry.user
                                        ? getInitials(entry.user.username)
                                        : '?'
                                }
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
