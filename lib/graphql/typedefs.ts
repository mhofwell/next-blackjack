import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String!
        User(id: ID!): User!
        login(input: LoginCredentials!): LoginResponse!
        # Query for a user based on their credentials
    }

    type User {
        id: String!
        username: String!
        email: String!
        avatar: String
        team: String
    }

    type Mutation {
        signup(input: SignUpCredentials!): AuthResponse!
    }

    type AuthResponse {
        status: Int!
        errors: [String]
    }

    type LoginResponse {
        status: Int!
        id: String
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
