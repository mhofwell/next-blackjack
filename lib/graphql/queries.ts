import gql from 'graphql-tag';

export const OVERVIEW_QUERY = gql`
    query Overview($input: String!) {
        overview(input: $input) {
            activePools
            gameweek
            activeEntries
            totalEntries
            totalTreasury
            gameweek
        }
    }
`;

export const OPTIONS_QUERY = gql`
    query Options($input: String!) {
        options(input: $input) {
            id
            name
        }
    }
`;

export const DB_QUERY = gql`
    query Query {
        serverUrl {
            SERVER_URL
        }
    }
`;

export const POOL_BANNER_DATA_QUERY = gql`
    query PoolBannerData($input: String!) {
        poolBannerData(input: $input) {
            id
            name
            treasury
            fee
            total
            active
            inactive
            bust
            eliminated
            gameweek
        }
    }
`;

// MUTATIONS
//
//

export const UPDATE_POOL_DATA_MUTATION = gql`
    mutation Mutation($input: String!) {
        updatePoolData(input: $input) {
            activePools
            gameweek
            activeEntries
            totalEntries
            totalTreasury
        }
    }
`;
