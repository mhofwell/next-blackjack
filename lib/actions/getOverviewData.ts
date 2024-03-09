import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

export async function getOverviewData(id: string) {
    const query = gql`
        query Overview($input: String!) {
            overview(input: $input) {
                status
                errors
                overview {
                    activePools
                    gameweek
                    activeEntries
                    totalEntries
                    totalTreasury
                    gameweek
                }
            }
        }
    `;

    const variables = {
        input: id,
    };

    try {
        const { data } = await getClient().query({
            query: query,
            variables: variables,
        });

        return data.overview;
    } catch (error: any) {
        console.error(error);
        return {
            status: 400,
            errors: [error.message],
            overview: {
                activePools: 0,
                totalTreasury: 0,
                activeEntries: 0,
                totalEntries: 0,
                gameweek: 0,
            },
        };
    }
}
