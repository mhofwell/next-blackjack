import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Query {
        hello: String!
        User(id: ID!): User! 
        # Query for a user based on their credentials
    }

    type User {
        id: String!
        username: String!
        isLoggedIn: Boolean!
        email: String!
        hashedPassword: String!
        team: String? 
        avatar: String? 
        role: Role?
    }

    type Mutation {
        signup(input: SignUpCredentials): User! 
    }

    type SignUpCredentials {
        username: String!
        email: String!
        password: String!
    }

    enum Role {
        USER
        ADMIN
    }

    # type Subscription {
    #
    # }
`;

export default typeDefs;
