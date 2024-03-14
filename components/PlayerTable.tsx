import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './UI/table';

import { Text } from './UI/text';

type Player = {
    id: string;
    fn: string;
    ln: string;
    goals: number;
    own_goals: number;
    net_goals: number;
};

export default function PlayerTable({ players }: { players: Player[] }) {

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
