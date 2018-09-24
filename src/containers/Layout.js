import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import { connect } from 'react-redux';

import About from './About';
import AllCollectionsContainer from './AllCollectionsContainer';
import ContactUs from './ContactUs';
import Footer from '../components/Footer';
import GlobalSearchContainer from '../containers/GlobalSearchContainer';
import * as globalVars from '../services/global-vars';
import Header from '../components/Header/';
import HomePage from './HomePage';
import ItemsContainer from './ItemsContainer';
import ItemDetailContainer from './ItemDetailContainer';
import CollectionContainer from './CollectionContainer';
import Login from './Login';
import Nav from '../components/Nav';
import Notifications from 'react-notify-toast';
import ReactivesearchContainer from './ReactivesearchContainer';
import '../Layout.css';
import '../libs/nuwebcomm-scripts.js';
import { fetchApiToken } from '../actions/auth';
import Honeybadger from 'honeybadger-js';

Honeybadger.configure({
  apiKey: globalVars.HONEYBADGER_API_KEY,
  environment: globalVars.HONEYBADGER_ENV,
  debug: true
});

class Layout extends Component {
  componentDidMount() {
    this.props.fetchApiToken();
  }

  render() {
    const apiToken = this.props.authToken || '';

    return (
      <ReactiveBase
        app="common"
        url={globalVars.ELASTICSEARCH_PROXY_BASE + '/search/'}
        headers={{ 'X-API-Token': apiToken }}
      >
        <div>
          <Header />
          <Notifications />
          <Nav />
          <GlobalSearchContainer />
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/login" component={Login} />
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
            <Route
              path="/reactivesearch/"
              component={ReactivesearchContainer}
            />
            <Route exact path="/" component={HomePage} />
          </Switch>
          <Footer />
        </div>
      </ReactiveBase>
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
