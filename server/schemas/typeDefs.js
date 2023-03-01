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
        members: [User]
        budget: Float
        tasks: [Task]
    }

    type Task {
        _id: ID
        name: String!
        description: String!
        project: Project
        creator: User
        assignees: [User]
        status: String!
        dueDate: Int
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
        me: User
        project(projectId: ID!): Project
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addProject(name: String!, members: [ID], budget: Float): User
        removeProject(projectId: ID!): User
        addTask(projectId: ID!, name: String!, description: String!, assignees: [ID], status: String!, dueDate: Int, impact: String, budget: Float): Project
        removeTask(projectId: ID!, taskId: ID!): Project
    }
`;

module.exports = typeDefs;