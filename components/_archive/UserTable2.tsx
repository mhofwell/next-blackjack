import { Avatar } from '../UI/avatar';
import { Badge } from '../UI/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../UI/table';

const users = [
    {
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        stats: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },{
        handle: 'sdfasfd',
        avatarUrl: 'mh.png',
        username: 'Burntelli42069',
        email: 'burntelli@gmail.com',
        net_goals: '21',
        online: true,
    },
];

export default function UserTable2() {
    return (
        <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
            <TableHead>
                <TableRow>
                    <TableHeader>Username</TableHeader>
                    <TableHeader>Net Goals</TableHeader>
                    <TableHeader>Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.handle}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar
                                    src={user.avatarUrl}
                                    className="size-8 mb-4"
                                />
                                <div>
                                    <div className="font-medium">
                                        {user.username}
                                    </div>
                                    <div className="text-zinc-500">
                                        <a
                                            
                                            // className="hover:text-zinc-700"
                                        >
                                            {user.stats}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-white">
                            {user.net_goals}
                        </TableCell>
                        <TableCell>
                            {user.online ? (
                                <Badge color="lime">ONLINE</Badge>
                            ) : (
                                <Badge color="zinc">Offline</Badge>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
