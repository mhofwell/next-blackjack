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
            response.status = 400;
            response.errors = [error.message];

            return response;
        }
    },
    updatePoolData: async (_parent: any, args: any, context: any) => {
        const id = args.input;
        const { prisma } = context;

        console.log('id', id);

        let response: BasicResponse = {
            status: 0,
            errors: [],
        };

        try {
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
                            players: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            });

            // early return for no pools found
            if (pools.length === 0) {
                throw new Error('No pools found.');
            }

            console.log(pools[0].entries[0].players);

            const epl = await fetch(
                'https://fantasy.premierleague.com/api/bootstrap-static/'
            );

            // for each pool, calculate G, NG, OG, and set status then save to the database.
            const eplData = await epl.json();

            // create types here for player and Pool! and Entry!
            //
            //
            //
            //
            //
            
            pools.forEach((pool) => {
                // for each entry
                pool.entries.forEach((entry) => {
                    let G = 0;
                    let OG = 0;
                    let count = 0;
                    let didAll4Score = false;
                    // get the players
                    entry.players.forEach((player) => {
                        const playerData = eplData.elements.find(
                            (element: { id: number }) =>
                                element.id === player.id
                        );

                        // sum the goal stats for this pool
                        if (playerData) {
                            if (playerData.goals_scored > 0) {
                                G += playerData.goals_scored;
                                count += 1;
                            }
                            OG += playerData.own_goals;
                        }
                    });

                    count === 4
                        ? (didAll4Score = true)
                        : (didAll4Score = false);

                    const NG = G - OG;
                    // set status for this entry

                    if (didAll4Score && NG <= 21) {
                        entry.state = 'ACTIVE';
                    } else if (!didAll4Score) {
                        entry.state = 'INACTIVE';
                    } else if (NG > 21) {
                        entry.state = 'BUST';
                    } else {
                        // Eliminated = can't automate this yet. Need to add a way to eliminate entries.
                        entry.state = 'ELIMINATED';
                    }

                    entry.paid = 'YES';
                    console.log(entry.id);
                    console.log('G', G);
                    console.log('OG', OG);
                    console.log('NG', NG);
                    console.log('didAll4Score', didAll4Score);
                    console.log('state', entry.state);
                    console.log('paid', entry.paid);
                });
                // save pool to database
            });

            response.status = 200;

            await prisma.$disconnect();
            return response;
        } catch (error: any) {
            response.status = 400;
            response.errors = [error.message];

            return response;
        }
    },
};

export default Mutation;
