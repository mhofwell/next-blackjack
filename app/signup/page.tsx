import SignUpForm from '../../components/SignUpForm';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';
import { SignUpSchema } from '@/lib/validator/schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';

type SignUpCredentials = z.infer<typeof SignUpSchema>;

export default async function Page() {
    // server-side api call
    async function registerNewUser(formData: SignUpCredentials) {
        'use server';
        console.log('FormData', formData);

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

        const { data, errors } = await getClient().mutate({
            mutation: mutation,
            variables: formDataToSubmit,
        });

        console.log('data', data);
        console.log('errors', errors);
    }

    return (
        <div className="flex h-screen">
            <SignUpForm registerNewUser={registerNewUser} />
        </div>
    );
}
