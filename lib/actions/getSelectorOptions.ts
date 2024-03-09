'use server';
import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

type OptionsResponse = {
    status: number;
    errors: string[];
    options: PoolSelectOption[];
};

type PoolSelectOption = {
    id: string;
    name: string;
};
export async function getSelectorOptions(id: string) {
    const response: OptionsResponse = {
        status: 0,
        errors: [],
        options: [],
    };
    const query = gql`
        query Options($input: String!) {
            options(input: $input) {
                status
                errors
                options {
                    id
                    name
                }
            }
        }
    `;

    const variables = {
        input: id,
    };

    try {
        const { data, loading, error } = await getClient().query({
            query: query,
            variables: variables,
        });

        response.options = data.options.options;
        response.status = 200;
        return response;
    } catch (error) {
        console.error(error);
        response.errors = [String(error)];
        return response;
    }
}
