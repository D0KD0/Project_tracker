const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        projects: [Project]
    }

    type Project {
        _id: ID
        name: String!
        nembers: [User]
        budget: Float
        tasks: [Task]
    }

    type Task {
        _id: ID
        name: String!
        description: String!
        project: Project
        creator: User
        assignee: [User]
        status: String!
        createdAt: Date
        dueDate: Date
        impact: String
        budget: Float
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(email: String!): User
        
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;