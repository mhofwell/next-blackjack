'use server';
import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

export async function getPoolBannerData(id: string) {
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

    console.log('API response', data);
    return data.poolBannerData;
}
