import { hashPassword } from '@/lib/tools/password';
import validateSignUpInput from '@/lib/validator/validate';

type SignUpResponse = {
    status: number;
    error: string | null;
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

        let response: SignUpResponse;

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
            if (result.status !== 200) {
                throw new Error('Input validaton check failed on the server.');
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

            console.log('existing', existingUser);

            if (existingUser !== null) {
                throw new Error('User already exists, please login.');
            }

            // hash user password
            let hash = await hashPassword(password);

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

            console.log('Sign in successful.');

            // sucess response
            response = {
                status: 200,
                error: null,
            };

            return response;
        } catch (error: any) {
            response = {
                status: 400,
                error: error.message,
            };
            console.log(response);

            return response;
        }
    },
};

export default Mutation;
