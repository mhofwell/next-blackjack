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
    activePlayers: number;
    totalPlayers: number;
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

            console.log('user', user);

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
                activePlayers: 0,
                totalPlayers: 0,
                gameweek: 0,
            },
        };
        try {
            // get the pools with managers matching the user id
            const activePools = await prisma.pool.count();
            console.log('active', activePools);

            // get the latest gameweek from EPL API
            // const gameweek = await prisma.gameweek.findFirst();
            const gameweek = 1; // change this to the actual gameweek

            // get active players
            const activePlayers = await prisma.entry.count({
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
            const totalPlayers = await prisma.entry.count();

            // treasury sum calculation
            // const totalTreasury = await prisma.player.aggregate({
            //     _sum: {
            //         treasury: true,
            //     },
            // });

            const totalTreasury = 123.25; // change this to the actual total treasury

            await prisma.$disconnect();

            response = {
                status: 200,
                errors: [],
                overview: {
                    activePools,
                    gameweek,
                    activePlayers,
                    totalPlayers,
                    totalTreasury,
                },
            };
            console.log('response', response);

            return response;
        } catch (error: any) {
            console.error(error);
            response.errors = [error.message];
            response.status = 400;
            return response;
        }
    },
};

export default Query;
