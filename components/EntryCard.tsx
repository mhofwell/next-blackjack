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

export default function EntryCard() {
    const entryState = useAppSelector((state) => state.entryReducer.data);
    const [loading, setLoading] = useState(false);
    const [entry, setEntry] = useState<EntryData>({
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
    });

    async function fetchEntry(entryId: string) {
        setLoading(true);

        const entryCardData = await getEntryCardData(entryId);
        const playerData = await getPlayerData(entryCardData.entry.players);

        // entryCardData.entry.rank = '1';
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

    return loading ? (
        <div className="flex items-center justify-center min-h-[600px]">
            <Spinner />
        </div>
    ) : (
        <div className="border border-gray-800 p-5 rounded-xl ">
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
                            <div className="mt-1 justify-end">
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
                                    className="ml-2"
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
