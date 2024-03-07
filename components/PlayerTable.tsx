import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './UI/table';

import { Text } from './UI/text';
// import { useEffect } from 'react';

type Player = {
    id: string;
    fn: string;
    ln: string;
    goals: number;
    own_goals: number;
    net_goals: number;
};

// const players: Player[] = [
//     {
//         id: '1',
//         fn: 'Virgil Van',
//         ln: 'Dijk',
//         goals: 5,
//         own_goals: 0,
//         net_goals: 5,
//     },
//     {
//         id: '2',
//         fn: 'Alphonso',
//         ln: 'Davies',
//         goals: 4,
//         own_goals: 0,
//         net_goals: 4,
//     },
//     {
//         id: '3',
//         fn: 'Kai',
//         ln: 'Havertz',
//         goals: 2,
//         own_goals: 1,
//         net_goals: 1,
//     },
//     {
//         id: '4',
//         fn: 'Harry',
//         ln: 'Kane',
//         goals: 5,
//         own_goals: 0,
//         net_goals: 5,
//     },
// ];

export default function PlayerTable({ players }: { players: Player[] }) {
    // create function to RETURN totals for goals, ng, own goals here. and then add to the table

    let totals = {
        goals: 0,
        own_goals: 0,
        net_goals: 0,
    };

    function getTotals() {
        players.forEach((player) => {
            totals.goals += player.goals;
            totals.own_goals += player.own_goals;
            totals.net_goals += player.net_goals;
        });

        return { ...totals };
    }

    totals = getTotals();

    // useEffect(() => {
    //     totals = getTotals();
    // }, [players]);

    return (
        <Table dense className="mx-auto">
            <TableHead>
                <TableRow>
                    <TableHeader>Footballer</TableHeader>
                    <TableHeader className="">G</TableHeader>
                    <TableHeader className="">OG</TableHeader>
                    <TableHeader className="">NG</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player) => (
                    <TableRow key={player.id}>
                        <TableCell className="font-medium">
                            {player.fn} {player.ln}
                        </TableCell>
                        <TableCell className=" tabular-nums">
                            {player.goals}
                        </TableCell>
                        <TableCell className=" tabular-nums">
                            {player.own_goals}
                        </TableCell>
                        <TableCell className=" tabular-nums">
                            {player.net_goals}
                        </TableCell>
                    </TableRow>
                ))}

                <TableRow className="border border-fuscia" key={totals.goals}>
                    <TableCell className="font-medium">
                        <Text>TOTAL</Text>
                    </TableCell>
                    <TableCell className=" tabular-nums">
                        {totals.goals}
                    </TableCell>
                    <TableCell className=" tabular-nums">
                        {totals.own_goals}
                    </TableCell>
                    <TableCell className=" tabular-nums">
                        {totals.net_goals}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
