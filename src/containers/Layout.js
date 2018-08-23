import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import About from './About';
import AllCollectionsContainer from './AllCollectionsContainer';
import ContactUs from './ContactUs';
import Footer from '../components/Footer';
import GlobalSearch from '../components/GlobalSearch';
import Header from '../components/Header/';
import HomePage from './HomePage';
import ItemsContainer from './ItemsContainer';
import ItemDetailContainer from './ItemDetailContainer';
import CollectionContainer from './CollectionContainer';
import Login from './Login';
import Nav from '../components/Nav';
import Notifications from 'react-notify-toast';
import SearchResultsContainer from './SearchResultsContainer';
import '../Layout.css';
import '../libs/nuwebcomm-scripts.js';
import { fetchApiToken } from '../actions/auth';

class Layout extends Component {
  componentDidMount() {
    this.props.fetchApiToken();
  }

  render() {
    return (
      <div>
        <Header />
        <Notifications />
        <Nav />
        <GlobalSearch />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/search-results"
            component={SearchResultsContainer}
          />
          <Route
            exact
            path="/collections/:id"
            component={CollectionContainer}
          />
          <Route
            exact
            path="/collections"
            component={AllCollectionsContainer}
          />
          <Route path="/items/:id" component={ItemDetailContainer} />
          <Route path="/items/" component={ItemsContainer} />
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  fetchApiToken: () => dispatch(fetchApiToken())
});

const ConnectedLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default withRouter(ConnectedLayout);
