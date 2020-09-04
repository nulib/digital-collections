import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import { connect } from "react-redux";
import ScreensAbout from "./About/About";
import ScreensCollectionList from "./Collection/List";
import ScreensContactUs from "./ContactUs";
import Footer from "../components/UI/Footer";
import * as globalVars from "../services/global-vars";
import Header from "../components/UI/Header/";
import ScreensHome from "./Home/Home";
import ScreensWork from "./Work/Work";
import ScreensCollection from "./Collection/Collection";
import Default404 from "./Default404";
import NavContainer from "../components/UI/Nav/NavContainer";
import Notifications from "react-notify-toast";
import ScreensSearch from "./Search/Search";
import ScreensEmbeddedViewer from "./EmbeddedViewer";

import { fetchApiToken } from "../actions/auth";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import ScreensLegacyPid from "./LegacyPid";

const ReactiveBaseWrapper = (props) => {
  return (
    <ReactiveBase
      app="common"
      url={globalVars.ELASTICSEARCH_PROXY_BASE + "/search/"}
      headers={{ "X-API-Token": props.apiToken }}
    >
      {props.children}
    </ReactiveBase>
  );
};

ReactiveBaseWrapper.propTypes = {
  apiToken: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export class Layout extends Component {
  static propTypes = {
    authToken: PropTypes.string,
    fetchApiToken: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchApiToken();
  }

  render() {
    const apiToken = this.props.authToken;
    const { ROUTES } = globalVars;

    // Delay rendering of component until the authToken has processed
    // This avoids 'double' rendering of the entire app's components
    if (typeof apiToken === "undefined") {
      return null;
    }

    // Embedded iframe route
    if (this.props.history.location.pathname.includes("/embedded-viewer")) {
      return (
        <Route
          exact
          path={ROUTES.EMBEDDED_VIEWER.path}
          component={ScreensEmbeddedViewer}
        />
      );
    }

    return (
      <div>
        <Header />
        <Notifications />
        <NavContainer />
        <Switch>
          <Route exact path={ROUTES.ABOUT.path} component={ScreensAbout} />
          <Route
            exact
            path={ROUTES.CONTACT.path}
            component={ScreensContactUs}
          />
          <Route exact path={ROUTES.COLLECTION.path}>
            <ReactiveBaseWrapper apiToken={apiToken}>
              <ScreensCollection />
            </ReactiveBaseWrapper>
          </Route>
          <Route
            exact
            path={ROUTES.COLLECTIONS_ALL.path}
            component={ScreensCollectionList}
          />
          <Route path={ROUTES.ITEM_DETAIL.path} component={ScreensWork} />
          <Route path={ROUTES.SEARCH.path}>
            <ReactiveBaseWrapper apiToken={apiToken}>
              <ScreensSearch />
            </ReactiveBaseWrapper>
          </Route>

          <Route path={ROUTES.LEGACY_PID.path} component={ScreensLegacyPid} />

          <Route exact path={ROUTES.HOME.path} component={ScreensHome} />
          <Route path={ROUTES.PAGE_NOT_FOUND.path} component={Default404} />
          <Route component={Default404} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authToken: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiToken: () => dispatch(fetchApiToken()),
});

const ConnectedLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default withRouter(ConnectedLayout);
