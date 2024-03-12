'use server';
import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

export async function getPoolEntries(id: string) {
    if (id === '') {
        return;
    }

    const query = gql`
        query PoolEntries($input: String!) {
            poolEntries(input: $input) {
                status
                errors
                entries {
                    id
                    net_goals
                    status
                    paid
                    user {
                        id
                        username
                    }
                }
            }
        }
    `;

    const variables = {
        input: id,
    };

    const { data } = await getClient().query({
        query,
        variables,
    });

    return data.poolEntries;
}
