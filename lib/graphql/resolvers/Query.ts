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
    team: string;
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
                team: '',
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
                    team: true,
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
};

export default Query;
