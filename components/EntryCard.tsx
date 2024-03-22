'use client';
import { Avatar } from './UI/avatar';
import { Text } from './UI/text';
import { Badge } from './UI/badge';
import PlayerTable from './PlayerTable';
import { useAppSelector } from '@/lib/store/hooks';
import { useState, useEffect } from 'react';
import { getInitials } from '@/lib/tools/getInitials';
import { getEntryCardData } from '@/lib/actions/getEntryCardData';
import Spinner from './UI/spinner';
import { getPlayerData } from '@/lib/actions/getPlayerData';
import { useAppDispatch } from '@/lib/store/hooks';

type EntryData = {
    id: string;
    rank: string;
    status: string;
    paid: string;
    user: User;
    team: Team;
    email: string;
    avatar: string;
    players: Player[];
};

type Team = {
    id: string;
    name: string;
};

type Player = {
    id: string;
    fn: string;
    ln: string;
    goals: number;
    own_goals: number;
    net_goals: number;
};

type User = {
    id: string;
    username: string;
    email: string;
    avatar: string;
    team: Team;
};

const emptyState = {
    id: '',
    rank: '1',
    status: '',
    paid: '',
    user: {
        id: '',
        username: '',
        email: '',
        avatar: '',
        team: {
            id: '',
            name: '',
        },
    },
    team: {
        id: '',
        name: '',
    },
    email: '',
    avatar: '',
    players: [
        {
            id: '',
            fn: '-',
            ln: '',
            goals: 0,
            own_goals: 0,
            net_goals: 0,
        },
    ],
};

export default function EntryCard() {
    const entryState = useAppSelector((state) => state.entryReducer.data);
    const poolState = useAppSelector((state) => state.poolReducer.data);

    const [loading, setLoading] = useState(false);
    const [entry, setEntry] = useState<EntryData>(emptyState);

    const dispatch = useAppDispatch();

    async function fetchEntry(entryId: string) {
        setLoading(true);

        const entryCardData = await getEntryCardData(entryId);
        const playerData = await getPlayerData(entryCardData.entry.players);

        entryCardData.entry.players = playerData;

        setEntry(entryCardData.entry);
        setLoading(false);
    }

    useEffect(() => {
        // early return for no selector active
        if (entryState.active === '') {
            return;
        }

        // get the entry card data
        fetchEntry(entryState.active);
    }, [entryState.active]);

    useEffect(() => {
        // early return for no pool active
        if (poolState.active === '') {
            return;
        }

        // get the entry card data
        setEntry(emptyState);
    }, [poolState.active]);

    return loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
            <Spinner />
        </div>
    ) : (
        <div>
            <div className="flex pb-5 ">
                <div className="flex ">
                    <Avatar
                        initials={
                            entry.user ? getInitials(entry.user.username) : '?'
                        }
                        className="size-12"
                    />
                    <div className="flex ">
                        <div>
                            <h2 className="text-xl pl-5 pt-1">
                                {entry.user.username
                                    ? entry.user.username
                                    : 'Entry Details'}
                            </h2>
                            <Text className="pl-5">
                                {' '}
                                {entry.user.username
                                    ? // ? `Rank: ${entry.rank}`
                                      `Rank: 1`
                                    : 'Select an entry on the right to view details'}
                            </Text>
                        </div>
                        {entry.id ? (
                            <div className="mt-1 justify-end overflow-auto">
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
                                    className="ml-5"
                                >
                                    {entry.status}
                                </Badge>
                                <Badge
                                    color={
                                        entry.paid === 'YES' ? 'fuchsia' : 'red'
                                    }
                                    className="ml-5"
                                >
                                    {entry.paid === 'YES' ? 'PAID' : 'OWING'}
                                </Badge>{' '}
                            </div>
                        ) : (
                            ' '
                        )}
                    </div>
                </div>
            </div>

            <PlayerTable players={entry.players} />

            <div className="pt-10">
                <h3>Player Details:</h3>

                {entry.user && entry.user.email && entry.user.team ? (
                    <>
                        <Text className="text-sm pt-2">
                            Email: {entry.user.email}
                        </Text>
                        <Text className="">Club: {entry.user.team.name}</Text>
                    </>
                ) : (
                    <>
                        <br></br> <br></br>
                    </>
                )}
            </div>
        </div>
    );
}
