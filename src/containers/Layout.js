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
import HomePageContainer from './HomePageContainer';
import ItemsContainer from './ItemsContainer';
import ItemDetailContainer from './ItemDetailContainer';
import CollectionContainer from './CollectionContainer';
import Login from './Login';
import NavContainer from './NavContainer';
import Notifications from 'react-notify-toast';
import ReactivesearchContainer from './ReactivesearchContainer';
import '../Layout.css';
import '../libs/nuwebcomm-scripts.js';
import { fetchApiToken } from '../actions/auth';
import OpenDragon from '../components/OpenDragon';

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
      <ReactiveBase
        app="common"
        url={globalVars.ELASTICSEARCH_PROXY_BASE + '/search/'}
        headers={{ 'X-API-Token': apiToken }}
      >
        <div>
          <Header />
          <Notifications />
          <NavContainer />
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
            <Route path="/search/" component={ReactivesearchContainer} />
            <Route path="/openseadragon" component={OpenDragon} />
            <Route exact path="/" component={HomePageContainer} />
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
