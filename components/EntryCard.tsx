'use client';
import { Text } from './UI/text';
import { Badge } from './UI/badge';
import PlayerTable from './PlayerTable';
import { USER_ENTRY_QUERY } from '@/lib/graphql/queries';
import ErrorComponent from '@/app/dashboard/error';
import { useEffect, useState } from 'react';
import { serverActionQuery } from '@/lib/actions/serverActionQuery';
import { ApolloError } from '@apollo/client';
import Skeleton from './UI/skeleton';
import { useAppDispatch } from '@/lib/store/hooks';
import { resetActiveEntry } from '@/lib/store/slices/entry-slice';
import { Avatar } from './UI/avatar';
import { Button } from '@headlessui/react';
import toast from 'react-hot-toast';

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

async function fetchData(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<ApolloError | null>>,
    setEntryData: React.Dispatch<React.SetStateAction<EntryData | null>>,
    entryId: string | null
) {
    setError(null);
    setLoading(true);
    const variables = {
        input: entryId,
    };

    const { data, error } = await serverActionQuery(
        USER_ENTRY_QUERY,
        variables
    );

    if (data) {
        setEntryData(data.userEntry);
    }

    if (error) {
        setError(error);
    }
    setLoading(false);
}

export default function EntryCard({
    id,
    rank,
}: {
    id: string | null;
    rank: number | null;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApolloError | null>(null);
    const [entryData, setEntryData] = useState<EntryData | null>(null);
    const [entryId, setEntryId] = useState(id);
    const dispatch = useAppDispatch();
    const [isMobile, setIsMobile] = useState(false);

    const isDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shareIcon = isDarkMode ? '/dark_share.png' : '/light_share.png';

    const handleShare = () => {
        const url = window.location.origin + `/entry/${rank}/${entry.id}`;
        toast.success('Copied to clipboard!');
        navigator.clipboard.writeText(url);
    };

    useEffect(() => {
        // Ensure window is defined
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 425);
            };

            handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        setEntryId('');
        // fetch the entry id after entries are selected from the table.
        fetchData(setLoading, setError, setEntryData, entryId);
        dispatch(resetActiveEntry());
    }, []);

    let entry: EntryData = {
        id: entryData?.id || '',
        paid: entryData?.paid || '',
        status: entryData?.status || '',
        // rank: entryData?.rank || '',
        players: entryData?.players || [
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
            id: entryData?.user.id || '',
            username: entryData?.user.username || '',
            email: entryData?.user.email || '',
            avatar: entryData?.user.avatar || '',
            team: {
                id: entryData?.user.team.id || '',
                name: entryData?.user.team.name || '',
            },
        },
    };

    if (error) {
        return (
            <ErrorComponent
                error={error}
                // add reset function
                reset={() => {}}
            />
        );
    }

    if (loading) {
        return (
            <div className="">
                <Skeleton />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end">
                <img
                    className="size-6 mb-2"
                    style={{
                        cursor: 'pointer',
                    }}
                    src={shareIcon}
                    onClick={handleShare}
                ></img>
            </div>
            <PlayerTable players={entry.players} isMobile={isMobile} />
            <div className="flex flex-col pt-3">
                <Text className="text-sm pt-2 pb-2 pr-2">Details:</Text>
                <hr className="border border-gray-800" />
                {entry.id ? (
                    <div className="flex space-x-2 overflow-auto pt-3">
                        <Badge
                            className="text-2xs"
                            color={entry.paid === 'YES' ? 'fuchsia' : 'red'}
                        >
                            {entry.paid === 'YES' ? 'PAID' : 'OWING'}
                        </Badge>{' '}
                        {entry.user.username === 'Teddy Prosser' ? (
                            <Avatar
                                className="size-8"
                                src={'/liverpool_small.png'}
                                alt={entry.user.username}
                            />
                        ) : (
                            <Avatar
                                initials={'?'}
                                className="size-8"
                                // src={'/liverpool_small.png'}
                                alt={entry.user.username}
                            />
                        )}
                    </div>
                ) : (
                    ' '
                )}
            </div>
        </div>
    );
}
