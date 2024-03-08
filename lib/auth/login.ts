'use server';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { LogInSchema } from '@/lib/validator/schema';
import { z } from 'zod';
import { createSession } from '@/lib/auth/utils';

type LoginCredentials = z.infer<typeof LogInSchema>;

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

type LoginResponse = {
    session: string;
    status: number;
    errors: string[];
    user: User | null;
};

export async function logUserIn(formData: LoginCredentials) {
    let response: LoginResponse = {
        status: 0,
        errors: [],
        session: '',
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
        // validate data
        const validatedData = LogInSchema.safeParse(formData);

        if (!validatedData.success) {
            response.errors = [
                'Validation check failed on the server. Please try again.',
            ];
            response.status = 400;
            return response;
        }

        const formDataToSubmit = {
            input: validatedData.data,
        };

        const query = gql`
            query Login($input: LoginCredentials!) {
                login(input: $input) {
                    status
                    session
                    errors
                    user {
                        id
                        username
                        avatar
                        email
                        team {
                            id
                            name
                        }
                    }
                }
            }
        `;

        const { data } = await getClient().query({
            query: query,
            variables: formDataToSubmit,
        });

        console.log('data', data);

        if (data.login.errors.length > 0) {
            console.log('Errors', data.login.errors);
            response.errors = [
                'Login failed, user not found or password is incorrect. Please try again.',
            ];
            response.status = 400;
            return response;
        }

        // create session and send user data back to client
        if (data.login.status === 200 && data.login.user !== undefined) {
            const session = await createSession(data.login.user.id);

            response = {
                user: data.login.user,
                session: session,
                status: 200,
                errors: [],
            };

            return response;
        }

        if (data.login.user === undefined) {
            return response;
        }
    } catch (error) {
        console.error(error);
        response.errors = ['Something went wrong during login.'];
        response.status = 400;

        return response;
    }
}
