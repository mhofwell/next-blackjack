import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ZodIssue } from 'zod';

type LoginResponse = {
    status: number;
    cuid: string;
    error: ZodIssue[];
};

type AuthResponse = {
    status: number;
    error: ZodIssue[];
};

const Query = {
    hello: async (_parent: any, _args: any, contextValue: any) => {
        const { greeting } = contextValue;
        console.log('in the Query');

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
            cuid: '',
            error: [],
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
                },
            });

            // early return for no user found
            if (!user.id) {
                throw new Error('No user found');
            }

            response.status = 200;
            response.cuid = user.id;

            return response;

            // catch any errors
        } catch (error: any) {
            response.status = 400;
            response.error = [error.message];

            return response;
        }
    },
    logout: async (_parent: any, _args: any, _context: any) => {
        // Destroy the session
        let response: AuthResponse = {
            status: 0,
            error: [],
        };
        try {
            cookies().set('plbj-session', '', { expires: new Date(0) });
            redirect('/login');
        } catch (error: any) {
            response.status = 400;
            response.error = [error.message];
            return response;
        }
    },
};

export default Query;
