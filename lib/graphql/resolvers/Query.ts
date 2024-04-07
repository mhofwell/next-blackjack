import { sortEntries } from '@/lib/tools/sortEntries';

type LoginResponse = {
    status: number;
    user: User;
    errors: string[];
};

type User = {
    id: string;
    username: string;
    avatar: string;
    email: string;
    team: Team;
};

type Team = {
    id: number;
    name: string;
};

type PoolOptions = {
    id: string;
    name: string[];
};

type EntryCardData = {
    id: string;
    paid: string;
    status: string;
    user: User;
    players: Player[];
};

type UpdatedEntryCardData = {
    id: string;
    paid: string;
    status: string;
    user: User;
    players: PlayerWithGoals[];
};

type Player = {
    id: number;
    fn: string;
    ln: string;
    goal_adjustment: number;
    own_goal_adjustment: number;
};

type PlayerWithGoals = {
    id: number;
    fn: string;
    ln: string;
    goals: number;
    own_goals: number;
    net_goals: number;
};

type ListEntry = {
    id: string;
    net_goals: number;
    status: string;
    paid: boolean;
    user: {
        id: string;
        username: string;
    };
};

type PoolBannerData = {
    id: string;
    name: string;
    treasury: number;
    fee: number;
    total: number;
    active: number;
    inactive: number;
    bust: number;
    eliminated: number;
    gameweek: number;
};

const Query = {
    hello: async (_parent: any, _args: any, contextValue: any) => {
        const { greeting } = contextValue;
        try {
            return greeting;
        } catch (error) {
            console.error(error);
        }
    },
    user: async (_parent: any, args: any, context: any) => {
        const id = args.input;
        const { prisma } = context;

        let response: User = {
            id: '',
            username: '',
            avatar: '',
            email: '',
            team: {
                id: 0,
                name: '',
            },
        };

        const user = await prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                email: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        await prisma.$disconnect();

        if (!user.id) {
            throw new Error('No user found');
        }

        response = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            team: user.team,
        };

        return response;
    },
    login: async (_parent: any, args: any, context: any) => {
        const { prisma } = context;
        const { email, username } = args.input;

        let response: LoginResponse = {
            status: 0,
            errors: [],
            user: {
                id: '',
                username: '',
                avatar: '',
                email: '',
                team: {
                    id: 0,
                    name: '',
                },
            },
        };

        try {
            // Get the user from the database
            const user = await prisma.user.findFirst({
                where: {
                    email,
                    username,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    email: true,
                    team: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            await prisma.$disconnect();

            // early return for no user found
            if (!user.id) {
                throw new Error('No user found');
            }

            response = {
                status: 200,
                user: {
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email,
                    team: user.team,
                },
                errors: [],
            };

            return response;

            // catch any errors
        } catch (error: any) {
            await prisma.$disconnect();
            response.status = 400;
            response.errors = [error.message];

            return response;
        }
    },
    options: async (_parent: any, args: any, context: any) => {
        const { prisma } = context;
        const id = args.input;

        const poolData: PoolOptions = await prisma.pool.findMany({
            where: {
                manager: {
                    id: id,
                },
            },
            select: {
                id: true,
                name: true,
            },
        });

        await prisma.$disconnect();

        return poolData;
    },
    poolEntries: async (_parent: any, args: any, context: any) => {
        // get all the entries for a poolID
        const { prisma } = context;
        const id = args.input;

        if (!id) {
            return; // early return for no pool ID
        }

        const entries = await prisma.entry.findMany({
            where: {
                pool: {
                    id,
                },
            },
            select: {
                id: true,
                net_goals: true,
                status: true,
                paid: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });

        let response: ListEntry[] = sortEntries(entries);

        // could add the rank in here.
        await prisma.$disconnect();
        return response;
    },
    poolBannerData: async (_parent: any, args: any, context: any) => {
        // get the banner data for a pool
        const { prisma } = context;
        const id = args.input;

        if (!id) {
            return; // early return for no pool ID
        }

        const bannerData = await prisma.pool.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                treasury: true,
                fee: true,
                entries: {
                    select: {
                        id: true,
                        status: true,
                    },
                },
            },
        });

        // iterate through the banner data and count active, inactive, bust, and eliminated entries
        let active = 0;
        let inactive = 0;
        let bust = 0;
        let eliminated = 0;

        bannerData.entries.forEach((entry: ListEntry) => {
            if (entry.status === 'ACTIVE') {
                active++;
            } else if (entry.status === 'INACTIVE') {
                inactive++;
            } else if (entry.status === 'BUST') {
                bust++;
            } else if (entry.status === 'ELIMINATED') {
                eliminated++;
            }
        });

        // try {
        // get the latest gameweek from EPL API
        const res = await fetch(
            'https://fantasy.premierleague.com/api/fixtures?future=1'
        );
        const data = await res.json();
        const gameweek = data[0].event - 1;
        const response: PoolBannerData = {
            id: bannerData.id,
            name: bannerData.name,
            treasury: bannerData.treasury,
            fee: bannerData.fee,
            total: bannerData.entries.length,
            active: active,
            inactive: inactive,
            bust: bust,
            eliminated: eliminated,
            gameweek: gameweek,
        };

        await prisma.$disconnect();
        return response;
    },
    userEntry: async (_parent: any, args: any, context: any) => {
        // get the entry for a user in a pool
        const { prisma } = context;
        const { input } = args;

        console.log('input', input);

        if (!input) {
            return; // early return for no entry ID
        }

        const entry: EntryCardData = await prisma.entry.findFirst({
            where: {
                id: input,
            },
            select: {
                id: true,
                status: true,
                paid: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        avatar: true,
                        team: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                players: {
                    select: {
                        id: true,
                        fn: true,
                        ln: true,
                        goal_adjustment: true,
                        own_goal_adjustment: true,
                    },
                },
            },
        });

        await prisma.$disconnect();

        const epl = await fetch(
            'https://fantasy.premierleague.com/api/bootstrap-static/'
        );

        const eplData = await epl.json();

        let playersWithGoalsArray: PlayerWithGoals[] = [];

        entry.players.forEach((player: Player) => {
            const playerData = eplData.elements.find(
                (element: { id: number }) => {
                    return element.id === player.id;
                }
            );

            if (playerData) {
                playersWithGoalsArray.push({
                    id: player.id,
                    fn: player.fn,
                    ln: player.ln,
                    goals: playerData.goals_scored + player.goal_adjustment,
                    own_goals:
                        playerData.own_goals + player.own_goal_adjustment,
                    net_goals:
                        playerData.goals_scored -
                        playerData.own_goals +
                        (player.goal_adjustment - player.own_goal_adjustment),
                });
            }
        });

        const newEntry: UpdatedEntryCardData = {
            ...entry,
            players: playersWithGoalsArray,
        };
        console.log('newentry', newEntry);

        return newEntry;
    },
};

export default Query;
