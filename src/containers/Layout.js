import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import { connect } from 'react-redux';

import About from './About';
import AllCollectionsContainer from './AllCollectionsContainer';
import ContactUs from './ContactUs';
import Footer from '../components/Footer';
import * as globalVars from '../services/global-vars';
import Header from '../components/Header/';
import HomePageContainer from './HomePageContainer';
import ItemDetailContainer from './ItemDetailContainer';
import CollectionContainer from './CollectionContainer';
import NavContainer from './NavContainer';
import Notifications from 'react-notify-toast';
import ReactivesearchContainer from './ReactivesearchContainer';
import '../Layout.css';
import '../libs/nuwebcomm-scripts.js';
import { fetchApiToken } from '../actions/auth';

const ReactiveBaseWrapper = props => {
  return (
    <ReactiveBase
      app="common"
      url={globalVars.ELASTICSEARCH_PROXY_BASE + '/search/'}
      headers={{ 'X-API-Token': props.apiToken }}
    >
      {props.children}
    </ReactiveBase>
  );
};

export class Layout extends Component {
  componentDidMount() {
    this.props.fetchApiToken();
  }

  render() {
    const apiToken = this.props.authToken;

    // Delay rendering of component until the authToken has processed
    // This avoids 'double' rendering of the entire app's components
    // TODO: Look into an alternate way to wrap ReactiveBase around only the components which need it?
    if (typeof apiToken === 'undefined') {
      return null;
    }

    return (
      <div>
        <Header />
        <Notifications />
        <NavContainer />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/collections/:id">
            <ReactiveBaseWrapper apiToken={apiToken}>
              <CollectionContainer />
            </ReactiveBaseWrapper>
          </Route>
          <Route
            exact
            path="/collections"
            component={AllCollectionsContainer}
          />
          <Route path="/items/:id" component={ItemDetailContainer} />
          <Route path="/search/">
            <ReactiveBaseWrapper apiToken={apiToken}>
              <ReactivesearchContainer />
            </ReactiveBaseWrapper>
          </Route>
          <Route exact path="/" component={HomePageContainer} />
          <Route component={HomePageContainer} />
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
