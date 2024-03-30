import { getClient } from '../apollo/client';
import { DB_QUERY } from '../graphql/queries';

export async function getDbCredentials() {
    const { data, errors } = await getClient().query({
        query: DB_QUERY,
    });

    if (errors) {
        console.error('errors', errors);
        return '';
    }

    return data.getDbCredentials;
}
