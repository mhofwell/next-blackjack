'use server';
import { ApolloQueryResult } from '@apollo/client';
import { getClient } from '../apollo/client';
import { DB_QUERY } from '../graphql/queries';

interface QueryResponse {
    serverUrl: {
        SERVER_URL: string;
    };
}

export async function getServerCredentials() {
    // this server action has access to server env vars and can make requests
    const result: ApolloQueryResult<QueryResponse> = await getClient().query({
        query: DB_QUERY,
    });
    console.log('result', result);

    return result;
}
