import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String!
        user(id: ID!): User!
        login(input: LoginCredentials!): LoginResponse!
        # working on this now.. convert total treasury to CAD
        overview(input: String!): OverviewResponse!
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

    type Mutation {
        signup(input: SignUpCredentials!): AuthResponse!
    }

    type OverviewResponse {
        status: Int!
        errors: [String]
        overview: OverviewData
    }

    type OverviewData {
        activePools: Int!
        gameweek: Int!
        activePlayers: Int!
        totalPlayers: Int!
        totalTreasury: Float!
    }

    type AuthResponse {
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
