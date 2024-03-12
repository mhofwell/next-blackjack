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

type OverviewResponse = {
    status: number;
    errors: string[];
    overview: OverviewData;
};

type OverviewData = {
    activePools: number;
    totalTreasury: number;
    activeEntries: number;
    totalEntries: number;
    gameweek: number;
};

type OptionsResponse = {
    status: number;
    errors: string[];
    options: PoolOptions;
};

type PoolOptions = {
    id: string;
    name: string[];
};

type EntryResponse = {
    status: number;
    errors: string[];
    entries: Entry[];
};

type Entry = {
    id: string;
    net_goals: number;
    status: string;
    user: {
        id: string;
        username: string;
    };
};

type PoolBannerResponse = {
    status: number;
    errors: string[];
    bannerData: PoolBannerData;
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
    overview: async (_parent: any, args: any, context: any) => {
        const id = args.input;
        const { prisma } = context;

        let response: OverviewResponse = {
            status: 0,
            errors: [],
            overview: {
                activePools: 0,
                totalTreasury: 0,
                activeEntries: 0,
                totalEntries: 0,
                gameweek: 0,
            },
        };
        try {
            // get the pools the user manages
            const activePools = await prisma.pool.count({
                where: {
                    manager: {
                        id: id,
                    },
                },
            });

            // get the latest gameweek from EPL API
            const res = await fetch(
                'https://fantasy.premierleague.com/api/fixtures?future=1'
            );

            const data = await res.json();
            const gameweek = data[0].event - 1;

            // get active players
            const activeEntries = await prisma.entry.count({
                where: {
                    status: 'ACTIVE',
                    pool: {
                        manager: {
                            id: id,
                        },
                    },
                },
            });

            // change this to count for all players in pools with managers matching the user id
            const totalEntries = await prisma.entry.count();

            // treasury sum calculation.
            const totalTreasury = await prisma.pool.aggregate({
                _sum: {
                    treasury: true,
                },
                where: {
                    manager: {
                        id: id,
                    },
                },
            });

            // we have to reseed database to get float numbers in here with decimals.
            console.log('tt', totalTreasury._sum.treasury);

            await prisma.$disconnect();

            response = {
                status: 200,
                errors: [],
                overview: {
                    activePools,
                    gameweek,
                    activeEntries,
                    totalEntries,
                    totalTreasury: totalTreasury._sum.treasury,
                },
            };

            return response;
        } catch (error: any) {
            await prisma.$disconnect();
            response.errors = [error.message];
            response.status = 400;
            return response;
        }
    },
    options: async (_parent: any, args: any, context: any) => {
        const { prisma } = context;
        const id = args.input;

        let response: OptionsResponse = {
            status: 0,
            errors: [],
            options: {
                id: '',
                name: [],
            },
        };

        try {
            const poolData = await prisma.pool.findMany({
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

            response.status = 200;
            response.options = poolData;
            await prisma.$disconnect();

            return response;
        } catch (error: any) {
            await prisma.$disconnect();
            response.status = 400;
            response.errors = [error.message];
            return response;
        }
    },
    poolEntries: async (_parent: any, args: any, context: any) => {
        // get all the entries for a poolID
        const { prisma } = context;
        const id = args.input;

        console.log('id', id);

        let response: EntryResponse = {
            status: 0,
            errors: [],
            entries: [
                {
                    id: '',
                    net_goals: 0,
                    status: '',
                    user: {
                        id: '',
                        username: '',
                    },
                },
            ],
        };
        try {
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

            if (entries.length === 0) {
                return response; // early return for no entries found
            }

            const sortedArray = sortEntries(entries);

            response.status = 200;
            response.entries = sortedArray;
            await prisma.$disconnect();
            console.log(response);
            return response;
        } catch (error: any) {
            await prisma.$disconnect();
            response.status = 400;
            response.errors = [error.message];
            return response;
        }
    },
    poolBannerData: async (_parent: any, args: any, context: any) => {
        // get the banner data for a pool
        const { prisma } = context;
        const id = args.input;

        let response: PoolBannerResponse = {
            status: 0,
            errors: [],
            bannerData: {
                id: '',
                name: '',
                treasury: 0,
                fee: 0,
                total: 0,
                active: 0,
                inactive: 0,
                bust: 0,
                eliminated: 0,
                gameweek: 0,
            },
        };

        try {
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
                    gameweek: true,
                },
            });

            // iterate through the banner data and count active, inactive, bust, and eliminated entries
            let active = 0;
            let inactive = 0;
            let bust = 0;
            let eliminated = 0;

            bannerData.entries.forEach((entry: Entry) => {
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

            console.log('active', active);
            console.log('inactive', inactive);
            console.log('bust', bust);
            console.log('eliminated', eliminated);
            console.log('fee', bannerData.fee);

            response.bannerData = {
                id: bannerData.id,
                name: bannerData.name,
                treasury: bannerData.treasury,
                fee: bannerData.fee,
                total: bannerData.entries.length,
                active: active,
                inactive: inactive,
                bust: bust,
                eliminated: eliminated,
                gameweek: bannerData.gameweek,
            };

            response.status = 200;
            await prisma.$disconnect();
            return response;
        } catch (error: any) {
            await prisma.$disconnect();
            response.status = 400;
            response.errors = [error.message];
            return response;
        }
    },
};

export default Query;
