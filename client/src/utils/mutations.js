import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $members: [ID], $budget: Float) {
    addProject(name: $name, members: $members, budget: $budget) {
      _id
      name
      budget
    
      tasks {
        _id
        budget
        description
        dueDate
        impact
        name
        status
        assignees {
          _id
          email
          username
        }
      }
    } 
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
      email
      username
      projects {
        name
        budget
        _id
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($projectId: ID!, $name: String!, $description: String!, $status: String!, $assignees: [ID], $dueDate: Float, $impact: String, $budget: Float) {
    addTask(projectId: $projectId, name: $name, description: $description, status: $status, assignees: $assignees, dueDate: $dueDate, impact: $impact, budget: $budget) {
      _id
      budget
      name
      tasks {
        _id
        budget
        status
        name
        impact
        dueDate
        description
        assignees {
          _id
          email
          username
        }
        creator {
          _id
          email
          username
        }
      }
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($projectId: ID!, $taskId: ID!) {
    removeTask(projectId: $projectId, taskId: $taskId) {
      _id
      budget
      name
      members {
        _id
        email
        username
      }
      tasks {
        _id
        assignees {
          _id
          email
          username
        }
        budget
        description
        dueDate
        impact
        name
        status
        creator {
          _id
          email
          username
        }
      }
    }
  }
`;