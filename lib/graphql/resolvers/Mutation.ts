import { pool } from '@/lib/store/slices/pool-slice';
import { hashPassword } from '@/lib/tools/password';
import { validateSignUpInput } from '@/lib/validator/validate';
import { ZodIssue } from 'zod';

type BasicResponse = {
    status: number;
    errors: ZodIssue[];
};

type SignUpFormData = {
    input: {
        username: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
};

type UserCreationData = {
    username: string;
    email: string;
    hashedPassword: string;
    fn: string;
    ln: string;
};

type Player = {
    id: number;
    goal_adjustment: number;
    own_goal_adjustment: number;
};

type Pool = {
    id: string;
    name: string;
    entries: Entry[];
};

type Entry = {
    id: number;
    goals: number;
    own_goals: number;
    net_goals: number;
    players: Player[];
    status: string;
    paid: string;
};

type OverviewData = {
    activePools: number;
    totalTreasury: number;
    activeEntries: number;
    totalEntries: number;
    gameweek: number;
};

const Mutation = {
    signup: async (_parent: any, args: SignUpFormData, context: any) => {
        const { prisma } = context;

        let response: BasicResponse = {
            status: 0,
            errors: [],
        };

        try {
            // get user information from args
            const { username, email, password, password_confirmation } =
                args.input;

            // validate sign up input
            const result = await validateSignUpInput({
                username,
                email,
                password,
                password_confirmation,
            });

            // early return for failed server side input validation
            if (result.status !== 200 || !result.validatedOutput) {
                throw new Error('Failed server-side form validation.');
            }

            // check if user exists already.
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: email,
                },
                select: {
                    id: true,
                },
            });

            if (existingUser !== null) {
                throw new Error('User already exists, please login.');
            }

            // hash user password
            let hash = await hashPassword(result.validatedOutput.password);

            // early return for no hashed password
            if (!hash) {
                throw new Error(
                    'Something went wrong during password hashing.'
                );
            }

            // create the user object to save in the database
            const userData: UserCreationData = {
                username: username,
                fn: username,
                ln: '',
                email: email,
                hashedPassword: hash,
            };

            // save user in database with prisma
            const user = await prisma.user.create({
                data: userData,
                select: {
                    id: true,
                },
            });

            await prisma.$disconnect();

            // early return to check if save was successful
            if (!user.id) {
                throw new Error(
                    'Something went wrong while creating your account.'
                );
            }

            // sucess response
            response.status = 200;
            console.log('Sign in successful.');

            return response;
        } catch (error: any) {
            // unsuccessful response with error message
            console.error(error);
            await prisma.$disconnect();
            response.status = 400;
            response.errors = [error.message];

            return response;
        }
    },
    updatePoolData: async (_parent: any, args: any, context: any) => {
        const id = args.input;
        const { prisma } = context;

        // Get all of the pools belonging to the user
        let pools = await prisma.pool.findMany({
            where: {
                userId: id,
            },
            select: {
                id: true,
                name: true,
                entries: {
                    select: {
                        id: true,
                        status: true,
                        paid: true,
                        goals: true,
                        own_goals: true,
                        net_goals: true,
                        players: {
                            select: {
                                id: true,
                                goal_adjustment: true, // add adjustment
                                own_goal_adjustment: true, // add adjustment
                            },
                        },
                    },
                },
            },
        });

        // early return for no pools found
        if (pools.length === 0) {
            console.log('No pools found for user.');
            return;
        }

        // calculate gameweek
        const futureFixtures = await fetch(
            'https://fantasy.premierleague.com/api/fixtures?future=1'
        );

        const gwData = await futureFixtures.json();

        const gameweek = gwData[0].event - 1;

        const epl = await fetch(
            'https://fantasy.premierleague.com/api/bootstrap-static/'
        );

        // for each pool, calculate G, NG, OG, and set status then save to the database.
        const eplData = await epl.json();

        let active = 0;
        let total = 0;
        pools.forEach((pool: Pool) => {
            // for each entry
            pool.entries.forEach((entry: Entry) => {
                let G = 0;
                let OG = 0;
                let count = 0;
                let didAll4Score = false;
                total += 1;
                // get the players
                entry.players.forEach((player: Player) => {
                    const playerData = eplData.elements.find(
                        (element: { id: number }) => element.id === player.id
                    );
                    // sum the goal stats for this pool
                    if (playerData) {
                        if (playerData.goals_scored > 0) {
                            G += playerData.goals_scored;
                            count += 1;
                        }
                        //sum adjustments
                        G += player.goal_adjustment;
                        OG += player.own_goal_adjustment;
                    }
                });

                count === 4 ? (didAll4Score = true) : (didAll4Score = false);

                const NG = G - OG;

                // set goals for the entry
                entry.goals = G;
                entry.own_goals = OG;
                entry.net_goals = NG;

                // set paid for the entry
                entry.paid = 'YES';

                // set status for this entry
                if (didAll4Score && NG <= 21) {
                    entry.status = 'ACTIVE';
                    active += 1;
                } else if (!didAll4Score) {
                    entry.status = 'INACTIVE';
                } else if (NG > 21) {
                    entry.status = 'BUST';
                } else {
                    // Eliminated = can't automate this yet. Need to add a way to eliminate entries.
                    entry.status = 'ELIMINATED';
                }
            });
        });

        // loop over entries in each pool and save them to the database
        for (let i = 0; i < pools.length; i++) {
            for (let j = 0; j < pools[i].entries.length; j++) {
                await prisma.entry.update({
                    where: {
                        id: pools[i].entries[j].id,
                    },
                    data: {
                        status: pools[i].entries[j].status,
                        paid: pools[i].entries[j].paid,
                        goals: pools[i].entries[j].goals,
                        own_goals: pools[i].entries[j].own_goals,
                        net_goals: pools[i].entries[j].net_goals,
                    },
                    select: {
                        id: true,
                        status: true,
                        paid: true,
                        goals: true,
                        own_goals: true,
                        net_goals: true,
                    },
                });
            }
        }

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

        await prisma.$disconnect();

        const response: OverviewData = {
            activePools: pools.length,
            gameweek: gameweek,
            activeEntries: active,
            totalEntries: total,
            totalTreasury: totalTreasury._sum.treasury,
        };

        return response;
    },
};

export default Mutation;
