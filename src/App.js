import React, { Component, Fragment } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import MatchesPage from './components/MatchesPage';
import TeamsPage from './components/TeamsPage';
import StatisticsPage from './components/StatisticsPage';
import RulesPage from './components/RulesPage';
import Footer from './components/Footer';
import { Container, Wrapper } from './components/Elements';
const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjlr0p1g412i101gmf6o79vit/master'
});

const NotFoundPage = ({location}) => (
  <React.Fragment>
    <h1>404 - Page Not Found</h1>
    <p>Unfortunatly, the page {location.pathname} does not exist on our servers. Please return to the home page to view this website.</p>
  </React.Fragment>
)
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Wrapper>
        <Router>
        <Fragment>
        <Navbar />
          <Container>
          <Switch>
            <Route path="/" exact><HomePage /></Route>
            <Route path="/admin"><AdminPage /></Route>
            <Route path="/matches"><MatchesPage /></Route>
            <Route path="/teams"><TeamsPage /></Route>
            <Route path="/statistics"><StatisticsPage /></Route>
            <Route path="/rules"><RulesPage /></Route>
            <Route><NotFoundPage /></Route>
          </Switch>
          </Container>
          <Footer />
          </Fragment>
        </Router>
        </Wrapper>
      </ApolloProvider>
    );
  }
}

export default App;
