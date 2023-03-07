import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import CreateProject from './components/CreateProject';
import CreateTask from './components/CreateTask';
import TableView from './components/ViewTable';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <div className="bg-tan">
            <section id="Logo_Container" className="bg-brown txt-lighttan flex-centered">
              Pocket Manager
            </section>
            <section id="Content_Container" className="bg-tan30">
              <Route path="/login" component={LoginForm} />
              <Route path="/signup" component={SignupForm} />
              <Route path="/navbar" component={Navbar} />
              <Route path="/CreateProject" component={CreateProject} />
              <Route path="/CreateTask" component={CreateTask} />
              <Route path="/TableView" component={TableView} />
            </section>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}
export default App;
