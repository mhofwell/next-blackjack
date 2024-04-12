import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String!
        user(id: ID!): User!
        login(input: LoginCredentials!): LoginResponse!
        options(input: String!): [PoolOption]
        poolEntries(input: String!): [EntryData]
        poolBannerData(input: String!): PoolBannerData
        userEntry(input: String!): UserEntry
    }

    type Mutation {
        signup(input: SignUpCredentials!): BasicResponse!
        updatePoolData(input: String!): OverviewData
    }

    type PoolCount {
        count: Int!
    }

    type User {
        id: String!
        username: String!
        email: String!
        avatar: String
        team: Team
    }

    type AllEntriesUser {
        id: String!
        username: String!
    }

    type EntryData {
        id: String!
        goals: Int!
        own_goals: Int!
        net_goals: Int!
        status: String!
        paid: String!
        user: AllEntriesUser
    }

    type UserEntry {
        id: String!
        paid: String!
        status: String!
        players: [Player]
        user: User
    }

    type UserEntryLarge {
        id: String!
        paid: String!
        status: String!
        pool: PoolBannerData
        players: [Player]
        user: User
    }

    type Player {
        id: Int!
        fn: String!
        ln: String!
        goals: Int!
        own_goals: Int!
        net_goals: Int!
    }

    type Team {
        id: Int!
        name: String!
    }

    type PoolBannerData {
        id: String!
        name: String!
        treasury: Float!
        fee: Float!
        total: Int!
        active: Int!
        inactive: Int!
        bust: Int!
        eliminated: Int!
        gameweek: Int!
    }

    type PoolOption {
        id: String!
        name: String!
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
