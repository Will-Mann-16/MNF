import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import MatchesPage from './components/MatchesPage';
import TeamsPage from './components/TeamsPage'
import { Container } from './components/Elements';
const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjlr0p1g412i101gmf6o79vit/master'
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Container>
          <Navbar />
          <Switch>
            <Route path="/" exact><HomePage /></Route>
            <Route path="/admin"><AdminPage /></Route>
            <Route path="/matches"><MatchesPage /></Route>
            <Route path="/teams"><TeamsPage /></Route>
          </Switch>
          </Container>

        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
