'use server';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { SignUpSchema } from '@/lib/validator/schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';

type SignUpCredentials = z.infer<typeof SignUpSchema>;

export async function signUserUp(formData: SignUpCredentials) {
    const formDataToSubmit = {
        input: formData,
    };

    const mutation = gql`
        mutation Mutation($input: SignUpCredentials!) {
            signup(input: $input) {
                status
                errors
            }
        }
    `;

    const { data } = await getClient().mutate({
        mutation: mutation,
        variables: formDataToSubmit,
    });

    console.log('data', data);

    if (data.signup.error?.length > 0) {
        return data.signup.error;
    }

    if (data.signup.status === 200) {
        redirect('/login');
    }
}
