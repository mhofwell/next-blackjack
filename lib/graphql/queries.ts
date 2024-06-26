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

export const OPTIONS_QUERY = `
    query Options($input: String!) {
        options(input: $input) {
            id
            name
        }
    }
`;

export const POOL_ENTRIES_QUERY = `
    query PoolEntries($input: String!) {
        poolEntries(input: $input) {
            id
            goals
            own_goals
            net_goals
            status
            paid
            user {
                id
                username
            }
        }
    }
`;

export const POOL_BANNER_DATA_QUERY = `
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

export const USER_ENTRY_QUERY = `
    query UserEntry($input: String!) {
        userEntry(input: $input) {
            id
            paid
            status
            players {
                id
                fn
                ln
                goals
                own_goals
                net_goals
            }
            user {
                id
                username
                email
                avatar
                team {
                    id
                    name
                }
            }
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
