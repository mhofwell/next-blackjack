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
    id: number;
    fn: string;
    ln: string;
    goals: number;
    own_goals: number;
    net_goals: number;
};

export default function PlayerTable({
    players,
    isMobile,
}: {
    players: Player[];
    isMobile: boolean;
}) {
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
        <Table
            dense
            className="[--gutter:theme(spacing.4)] sm:[--gutter:theme(spacing.8)]"
        >
            <TableHead>
                <TableRow>
                    <TableHeader>Footballer ⚽️</TableHeader>
                    <TableHeader className="">G</TableHeader>
                    <TableHeader className="">OG</TableHeader>
                    <TableHeader className="">NG</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player) => (
                    <TableRow key={player.id}>
                        <TableCell className="font-medium text-xs sm:text-med">
                            {player.fn.length + player.ln.length > 15 &&
                            isMobile
                                ? `${player.fn.substring(
                                      0,
                                      8
                                  )}... ${player.ln.substring(0, 5)}...`
                                : `${player.fn} ${player.ln}`}
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
                        <Text className="text-xs sm:text-med">TOTAL</Text>
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
