import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String!
        user(id: ID!): User!
        login(input: LoginCredentials!): LoginResponse!
        overview(input: String!): OverviewResponse!
        options(input: String!): OptionsResponse!
    }

    type Mutation {
        signup(input: SignUpCredentials!): BasicResponse!
        # Working on this now
        updatePoolData(input: String!): BasicResponse!
    }

    type User {
        id: String!
        username: String!
        email: String!
        avatar: String
        team: Team
    }

    type Team {
        id: Int!
        name: String!
    }

    type OptionsResponse {
        status: Int!
        errors: [String]
        options: [PoolSelectOption!]
    }

    type PoolSelectOption {
        id: String!
        name: String!
    }

    type OverviewResponse {
        status: Int!
        errors: [String]
        overview: OverviewData
    }

    type OverviewData {
        activePools: Int!
        gameweek: Int!
        activeEntries: Int!
        totalEntries: Int!
        totalTreasury: Float!
    }

    type BasicResponse {
        status: Int!
        errors: [String]
    }

    type LoginResponse {
        session: String
        status: Int!
        errors: [String]
        user: User
    }

    type Error {
        message: String!
    }

    input SignUpCredentials {
        username: String!
        email: String!
        password: String!
        password_confirmation: String!
    }

    input LoginCredentials {
        email: String!
        password: String!
    }

    enum Role {
        USER
        ADMIN
    }
`;

export default typeDefs;
