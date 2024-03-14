'use server';

import { getClient } from '../apollo/client';
import gql from 'graphql-tag';

export async function getEntryCardData(id: string) {
    if (id === '') {
        return;
    }

    const query = gql`
        query UserEntry($input: String!) {
            userEntry(input: $input) {
                status
                errors
                entry {
                    id
                    paid
                    status
                    players {
                        id
                        fn
                        ln
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
        }
    `;

    const variables = {
        input: id,
    };

    const { data } = await getClient().query({
        query,
        variables,
    });

    return data.userEntry;
}
