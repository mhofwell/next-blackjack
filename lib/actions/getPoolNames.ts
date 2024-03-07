import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

type Response = {
    options: string[];
    status: string;
    errors: string[];
};

export async function getPoolNames(id: string) {
    const response: Response = {
        options: [],
        status: '',
        errors: [],
    };
    const query = gql`
        query GetPoolNames {
            poolNames {
                id
                name
            }
        }
    `;

    const variables = {
        input: {
            id: id,
        },
    };

    try {
        const { data, loading, error } = await getClient().query({
            query: query,
            variables: variables,
        });
        response.options = data.poolNames;
        return response;
    } catch (error) {
        console.error(error);
        response.errors = [String(error)];
        return response;
    }
}
