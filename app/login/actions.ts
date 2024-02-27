import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { LogInSchema } from '@/lib/validator/schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth/utils';

type LoginCredentials = z.infer<typeof LogInSchema>;

export async function logUserIn(formData: LoginCredentials) {
    'use server';

    const formDataToSubmit = {
        input: formData,
    };

    // validate form data

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
        return data.login.error;
    }

    // set cookies and redirect to dashboard
    if (data.login.error.length === 0 && data.login.status === 200) {
        const session = await createSession(data.login.cuid);
        if (session !== null) {
            redirect('/dashboard');
        }
    }
}
