'use server';

import { DocumentNode } from 'graphql';
import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

/**
 * Executes a GraphQL query on the server.
 *
 * @param query - The GraphQL query to execute.
 * @param variables - The variables to pass to the query.
 * @returns The result of the query.
 * @throws Will throw an error if the query execution fails.
 */

export async function serverActionQuery(
    query: string,
    variables: Record<string, any>
): Promise<any> {
    const formattedQuery: DocumentNode = gql`
        ${query}
    `;

    try {
        const result = await getClient().query({
            query: formattedQuery,
            variables: variables,
        });

        return result;
    } catch (error) {
        // logging the GraphQL/Apollo error
        console.error('Server action query error:', error);
        return {
            error: {
                message: 'Something went wrong.',
            },
            data: null,
        };
    }
}
