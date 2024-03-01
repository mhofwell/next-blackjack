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

import users from '@/test/testdata';

export default function UserTable({ poolData }: any) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Avatar</TableHeader>
                    <TableHeader>Username</TableHeader>
                    <TableHeader>Score</TableHeader>
                    {/* <TableHeader>Paid</TableHeader> */}
                    <TableHeader>Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id} href={'#'}>
                        <TableCell>1</TableCell>
                        <TableCell>
                            <Avatar
                                initials={'AA'}
                                className="size-6"
                                // src={user.avatar}
                                alt={user.name}
                            />
                        </TableCell>
                        <TableCell className="font-sm">{user.name}</TableCell>
                        <TableCell>{user.net_goals}</TableCell>
                        {/* <TableCell className="text-zinc-500">
                            <Badge
                                color={user.paid === 'YES' ? 'violet' : 'red'}
                            >
                                {user.paid}
                            </Badge>
                        </TableCell> */}
                        <TableCell className="text-zinc-500">
                            <Badge
                                color={
                                    user.status === 'ACTIVE'
                                        ? 'lime'
                                        : user.status === 'BUST'
                                        ? 'amber'
                                        : user.status === 'INACTIVE'
                                        ? 'zinc'
                                        : 'red'
                                }
                            >
                                {user.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
