import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String!
        user(id: ID!): User!
        login(input: LoginCredentials!): LoginResponse!
        overview(input: String!): OverviewResponse!
        options(input: String!): OptionsResponse!
        poolEntries(input: String!): EntryResponse!
        poolBannerData(input: String!): PoolBannerResponse!
        userEntry(input: String!): UserEntryResponse!
    }

    type Mutation {
        signup(input: SignUpCredentials!): BasicResponse!
        updatePoolData(input: String!): BasicResponse!
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

    type EntryResponse {
        status: Int!
        errors: [String]
        entries: [ListEntry]
    }

    type ListEntry {
        id: String!
        net_goals: Int!
        status: String!
        paid: String!
        user: AllEntriesUser
    }

    type UserEntryResponse {
        status: Int!
        errors: [String]
        entry: CardEntry
    }

    type CardEntry {
        id: String!
        user: User!
        status: String!
        paid: String!
        players: [Player]
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

    type PoolBannerResponse {
        status: Int!
        errors: [String]
        bannerData: PoolBannerData
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
