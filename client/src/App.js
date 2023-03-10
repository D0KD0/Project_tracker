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
import EditTask from './components/EditTask';
import logo from './images/logoPM.png'
import KanbanBoard from './components/DnD/Board';

import Auth from './utils/auth';
import LandingPage from './components/LandingPage';


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
  const  imageStyle ={height:"75px", width:"70px" }
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          
          <div className="bg-tan">
            <section id="Logo_Container" className="bg-brown txt-lighttan flex-centered">
              <img style={imageStyle} src={logo} alt="" srcset="" />
              <h3 className='brandname'>Pocket Manager</h3>
            </section>

            {Auth.loggedIn() ? (
              <>
                <section id="Content_Container" className="bg-tan30">
                  <Navbar />
                  <Switch>
                    <Route path="/CreateProject" component={CreateProject} />
                    <Route path="/project/:projectId/CreateTask" component={CreateTask} />
                    <Route path="/project/:projectId/TableView" component={TableView} />
                    <Route path="/EditTask" component={EditTask} />
                    <Route path="/project/:projectId/kanban" component={KanbanBoard} /> {/* Use the KanbanBoard component */}
                  </Switch>
                </section>
              </>
            ) : (
              <section id="" className="bg-tan-30">
                <Route path="/login" component={LoginForm} />
                <Route path="/" component={LandingPage} />
                <Route path="/signup" component={SignupForm} />
                
              </section>
            )}
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
