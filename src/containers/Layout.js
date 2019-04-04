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
import Default404 from './Default404';
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
    const { ROUTES } = globalVars;

    // Delay rendering of component until the authToken has processed
    // This avoids 'double' rendering of the entire app's components
    if (typeof apiToken === 'undefined') {
      return null;
    }

    return (
      <div>
        <Header />
        <Notifications />
        <NavContainer />
        <Switch>
          <Route exact path={ROUTES.ABOUT.path} component={About} />
          <Route exact path={ROUTES.CONTACT.path} component={ContactUs} />
          <Route exact path={ROUTES.COLLECTION.path}>
            <ReactiveBaseWrapper apiToken={apiToken}>
              <CollectionContainer />
            </ReactiveBaseWrapper>
          </Route>
          <Route
            exact
            path={ROUTES.COLLECTIONS_ALL.path}
            component={AllCollectionsContainer}
          />
          <Route
            path={ROUTES.ITEM_DETAIL.path}
            component={ItemDetailContainer}
          />
          <Route path={ROUTES.SEARCH.path}>
            <ReactiveBaseWrapper apiToken={apiToken}>
              <ReactivesearchContainer />
            </ReactiveBaseWrapper>
          </Route>
          <Route exact path={ROUTES.HOME.path} component={HomePageContainer} />
          <Route path={ROUTES.PAGE_NOT_FOUND.path} component={Default404} />
          <Route component={Default404} />
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
