'use client';
import { Avatar } from './UI/avatar';
import { Text } from './UI/text';
import { Badge } from './UI/badge';
import PlayerTable from './PlayerTable';
import { useAppSelector } from '@/lib/store/hooks';
import { getInitials } from '@/lib/tools/getInitials';
import { USER_ENTRY_QUERY } from '@/lib/graphql/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import ErrorComponent from '@/app/dashboard/error';
import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { resetActiveEntry } from '@/lib/store/slices/entry-slice';

type EntryData = {
    id: string;
    // rank: string;
    paid: string;
    status: string;
    players: Player[];
    user: User;
};

type Team = {
    id: string;
    name: string;
};

type Player = {
    id: number;
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

type QueryResponse = {
    userEntry: EntryData;
};

export default function EntryCard() {
    const entryState = useAppSelector((state) => state.entryReducer.data);
    const poolState = useAppSelector((state) => state.poolReducer.data);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetActiveEntry());
    }, [poolState.active]);

    const { data, error } = useSuspenseQuery<QueryResponse>(USER_ENTRY_QUERY, {
        errorPolicy: 'all',
        variables: { input: entryState.active },
        fetchPolicy: 'no-cache',
    });

    if (error) {
        return (
            <ErrorComponent
                error={error}
                // add reset function
                reset={() => {}}
            />
        );
    }

    const entryCardData: EntryData | undefined = data?.userEntry;

    let entry: EntryData = {
        id: entryCardData?.id || '',
        paid: entryCardData?.paid || '',
        status: entryCardData?.status || '',
        // rank: entryCardData?.rank || '',
        players: entryCardData?.players || [
            {
                id: 0,
                fn: '-',
                ln: '',
                goals: 0,
                own_goals: 0,
                net_goals: 0,
            },
        ],
        user: {
            id: entryCardData?.user.id || '',
            username: entryCardData?.user.username || '',
            email: entryCardData?.user.email || '',
            avatar: entryCardData?.user.avatar || '',
            team: {
                id: entryCardData?.user.team.id || '',
                name: entryCardData?.user.team.name || '',
            },
        },
    };

    return (
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
