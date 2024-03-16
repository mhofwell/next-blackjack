'use server';
import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

export async function getPoolBannerData(id: string) {
    if (id === '') {
        return;
    }
    const query = gql`
        query PoolBannerData($input: String!) {
            poolBannerData(input: $input) {
                status
                errors
                bannerData {
                    id
                    name
                    treasury
                    fee
                    active
                    total
                    inactive
                    bust
                    eliminated
                    gameweek
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

    console.log('data', data);

    return data.poolBannerData;
}
