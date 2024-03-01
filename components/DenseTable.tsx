import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './UI/table';

const players = [
    {
        id: '1',
        name: 'Virgil Van Dijk',
        goals: '5',
        own_goals: '0',
        net_goals: '5',
    },
    {
        id: '1',
        name: 'Alphonso Davies',
        goals: '10',
        own_goals: '0',
        net_goals: '10',
    },
    {
        id: '1',
        name: 'Kai Havertz',
        goals: '5',
        own_goals: '2',
        net_goals: '3',
    },
    {
        id: '1',
        name: 'Harry Kane',
        goals: '1',
        own_goals: '6',
        net_goals: '5',
    },
];

export default function DenseTable() {
    return (
        <Table dense className="mx-auto">
            <TableHead>
                <TableRow>
                    <TableHeader>Player</TableHeader>
                    <TableHeader className="">G</TableHeader>
                    <TableHeader className="">OG</TableHeader>
                    <TableHeader className="">NG</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player) => (
                    <TableRow key={player.id}>
                        <TableCell className="font-medium">
                            {player.name}
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
            </TableBody>
        </Table>
    );
}
