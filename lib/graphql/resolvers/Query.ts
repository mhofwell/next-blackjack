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

            response.status = 200;
            response.user.id = user.id;
            response.user.username = user.username;
            response.user.avatar = user.avatar;
            response.user.email = user.email;
            response.user.team = user.team;

            return response;

            // catch any errors
        } catch (error: any) {
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
            console.error(error);
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

            return response;
        } catch (error: any) {
            response.status = 400;
            response.errors = [error.message];
            return response;
        }
    },
};

export default Query;
