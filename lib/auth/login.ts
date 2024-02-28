'use server';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { LogInSchema } from '@/lib/validator/schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth/utils';

// these would work with Fetch in the lib folder but not with Apollo Client.

type LoginCredentials = z.infer<typeof LogInSchema>;

export async function logUserIn(formData: LoginCredentials) {
    // validate data
    const validatedData = LogInSchema.safeParse(formData);

    if (!validatedData.success) {
        return ['Validation check failed on the server. Please try again.'];
    }

    const formDataToSubmit = {
        input: validatedData.data,
    };

    const query = gql`
        query Login($input: LoginCredentials!) {
            login(input: $input) {
                status
                cuid
                error
            }
        }
    `;

    const { data } = await getClient().query({
        query: query,
        variables: formDataToSubmit,
    });

    if (data.login.error.length > 0) {
        return [
            'Login failed, user not found or password is incorrect. Please try again.',
        ];
    }

    // set cookies and redirect to dashboard
    if (data.login.error.length === 0 && data.login.status === 200) {
        const session = await createSession(data.login.cuid);
        if (session !== null) {
            redirect('/dashboard');
        }
    }
}
