import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { SignUpSchema } from '@/lib/validator/schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';

type SignUpCredentials = z.infer<typeof SignUpSchema>;

export async function registerNewUser(formData: SignUpCredentials) {
    'use server';

    const formDataToSubmit = {
        input: formData,
    };

    const mutation = gql`
        mutation Mutation($input: SignUpCredentials!) {
            signup(input: $input) {
                status
                error
            }
        }
    `;

    const { data } = await getClient().mutate({
        mutation: mutation,
        variables: formDataToSubmit,
    });

    if (data.signup.error?.length > 0) {
        return data.signup.error;
    }

    if (!data.signup.error && data.signup.status === 200) {
        redirect('/login');
    }
}
