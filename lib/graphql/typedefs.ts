import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String
        # Query for a user based on their credentials
    }

    # type Mutation {
    # Save a user to the database when they sign in
    # }

    # type Subscription {
    #
    # }
`;

export default typeDefs;
