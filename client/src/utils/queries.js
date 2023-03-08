import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    _id
    email
    username
    projects {
      _id
      budget
      members {
        _id
        email
        username
      }
      name
    }
  }
}
`;

export const QUERY_USERS = gql`
  query users {
    users {
      username
      _id
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
        projects {
            _id
            name
            members
            budget
        }
        email
        username
        _id
    }
  }
`;


export const QUERY_SINGLE_PROJECTS = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
        _id
        budget
        name
        tasks {
          _id
          assignees {
            username
            email
          }
          budget
          description
          dueDate
          impact
          name
          status
        }
        members {
          _id
          email
          username
        }
      }
  }
`;