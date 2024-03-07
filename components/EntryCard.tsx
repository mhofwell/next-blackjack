'use client';
import { Avatar } from './UI/avatar';
import { Text } from './UI/text';
import { Badge } from './UI/badge';
import PlayerTable from './PlayerTable';
import { useAppSelector } from '@/lib/store/hooks';
import { useState, useEffect } from 'react';

export default function EntryCard() {
    let data = {
        id: '',
        username: '',
        rank: '',
        status: '',
        paid: '',
        team: '',
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

    const [entry, setEntry] = useState(data);

    const entryId = useAppSelector((state) => state.playerReducer.data.active);

    let initials = 'DE';

    useEffect(() => {
        // use the playerId to call a server action to get the entry data
        console.log('entry', entryId);

        // set the initials to the first two letters of the username
        function getInitials(username: string) {
            return username.substring(0, 2).toLowerCase();
        }

        initials = getInitials(data.username);

        data = {
            id: entry.id,
            username: entry.username,
            rank: entry.rank,
            status: entry.status,
            paid: entry.paid,
            team: entry.team,
            email: entry.email,
            avatar: entry.avatar,
            players: entry.players,
        };

        // setPlayer to the data returned from the server
        setEntry(data);
    }),
        [entryId];

    return (
        <div className="border border-gray-800 p-5 rounded-xl ">
            <div className="flex pb-5 ">
                <div className="flex ">
                    <Avatar initials={initials} className="size-12" />
                    <div className="flex ">
                        <div>
                            <h2 className="text-xl pl-5 pt-1">
                                {data.username
                                    ? data.username
                                    : 'Entry Details'}
                            </h2>
                            <Text className="pl-5">
                                {' '}
                                {data.rank
                                    ? `Rank: ${data.rank}`
                                    : 'Choose a player on the right to view their entry'}
                            </Text>
                        </div>
                        {data.id ? (
                            <div className="mt-1 justify-end">
                                <Badge
                                    color={
                                        data.status === 'ACTIVE'
                                            ? 'lime'
                                            : data.status === 'BUST'
                                            ? 'amber'
                                            : data.status === 'INACTIVE'
                                            ? 'zinc'
                                            : 'red'
                                    }
                                    className="ml-5"
                                >
                                    {data.status}
                                </Badge>
                                <Badge
                                    color={
                                        data.paid === 'PAID' ? 'fuchsia' : 'red'
                                    }
                                    className="ml-2"
                                >
                                    {data.paid}
                                </Badge>{' '}
                            </div>
                        ) : (
                            ' '
                        )}
                    </div>
                </div>
            </div>

            <PlayerTable players={data.players} />

            <div className="pt-10">
                <h3>Player Details:</h3>

                {data.email && data.team ? (
                    <>
                        <Text className="text-sm pt-2">
                            Email: {data.email}
                        </Text>
                        <Text className="">Club: {data.team}</Text>
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
