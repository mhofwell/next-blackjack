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

import data from '@/test/testdata';

export default function PlayerTable() {
    const poolId = useAppSelector((state) => state.poolReducer.data.active);
    const [players, setPlayers] = useState(data);

    useEffect(() => {
        // use the poolId to call a server action to get the player entry data for this pool
        console.log('PlayerList', poolId);
        // setPlayers to the data returned from the server
    }, []);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Avatar</TableHeader>
                    <TableHeader>Username</TableHeader>
                    <TableHeader>Score</TableHeader>
                    <TableHeader>Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player) => (
                    <TableRow key={player.id} href={'#'}>
                        <TableCell>1</TableCell>
                        <TableCell>
                            <Avatar
                                initials={'AA'}
                                className="size-6"
                                // src={player.avatar}
                                alt={player.username}
                            />
                        </TableCell>
                        <TableCell className="font-sm">
                            {player.username}
                        </TableCell>
                        <TableCell>{player.net_goals}</TableCell>
                        <TableCell className="text-zinc-500">
                            <Badge
                                color={
                                    player.status === 'ACTIVE'
                                        ? 'lime'
                                        : player.status === 'BUST'
                                        ? 'amber'
                                        : player.status === 'INACTIVE'
                                        ? 'zinc'
                                        : 'red'
                                }
                            >
                                {player.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
