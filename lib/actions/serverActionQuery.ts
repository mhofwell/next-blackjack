'use server';
import { getClient } from '../apollo/client';
import { POOL_BANNER_DATA_QUERY } from '../graphql/queries';

export async function serverActionQuery({ variables }: { variables: any }) {
    const result = await getClient().query({
        query: POOL_BANNER_DATA_QUERY,
        variables: variables,
    });

    return result;
}
