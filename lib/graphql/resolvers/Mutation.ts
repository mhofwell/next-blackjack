import { hashPassword } from '@/lib/tools/password';
import { PrismaClient } from '@prisma/client';

type SignUpResponse = {
    status: number;
};

type SignUpFormData = {
    input: { username: string; email: string; password: string };
};

type UserCreationData = {
    username: string;
    email: string;
    hashedPassword: string;
};

const Mutation = {
    signup: async (_: any, args: SignUpFormData, contextValue: any) => {
        // const { prisma } = contextValue.prisma;
        const prisma = new PrismaClient();
        let response: SignUpResponse;
        try {
            // get user information from args
            const { username, email, password } = args.input;

            // early return if there is no user data
            if (!username || !email || !password) {
                response = {
                    status: 400,
                };
                return response;
            }
            console.log(username, email, password);

            // hash user password
            let hash = await hashPassword(password);

            console.log('hash', hash);

            if (!hash) {
                response = {
                    status: 400,
                };
                return response;
            }

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

            console.log('id', user.id);

            if (!user.id) {
                response = {
                    status: 400,
                };
                return response;
            }

            response = {
                status: 200,
            };

            return response;

            // get return value and send status 200.

            // (where req was made) if 200 then go to login page.
        } catch (error) {
            console.error(error);
        }
    },
};

export default Mutation;
