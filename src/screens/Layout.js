import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import { useSelector, useDispatch } from "react-redux";
import AboutScreen from "./About/About";
import ScreensCollectionList from "./Collection/List";
import ScreensContactUs from "./ContactUs";
import Footer from "../components/UI/Footer";
import { ELASTICSEARCH_PROXY_BASE, ROUTES } from "../services/global-vars";
import Header from "../components/UI/Header/";
import ScreensHome from "./Home/Home";
import ScreensWork from "./Work/Work";
import ScreensCollection from "./Collection/Collection";
import Default404 from "./Default404";
import NavContainer from "../components/UI/Nav/NavContainer";
import Notifications from "react-notify-toast";
import ScreensSearch from "./Search/Search";
import "../Layout.css";
import "../libs/nuwebcomm-scripts.js";
import { fetchApiToken } from "../actions/auth";
import PropTypes from "prop-types";

const ReactiveBaseWrapper = ({ apiToken, children }) => {
  return (
    <ReactiveBase
      app="common"
      url={ELASTICSEARCH_PROXY_BASE + "/search/"}
      headers={{ "X-API-Token": apiToken }}
    >
      {children}
    </ReactiveBase>
  );
};

ReactiveBaseWrapper.propTypes = {
  apiToken: PropTypes.string,
  children: PropTypes.node.isRequired
};

const Layout = () => {
  const dispatch = useDispatch();
  const apiToken = useSelector(state => state.token);

  useEffect(() => {
    dispatch(fetchApiToken());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Notifications />
      <NavContainer />
      <Switch>
        <Route exact path={ROUTES.ABOUT.path} component={AboutScreen} />
        <Route exact path={ROUTES.CONTACT.path} component={ScreensContactUs} />
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
        <Route exact path={ROUTES.HOME.path} component={ScreensHome} />
        <Route path={ROUTES.PAGE_NOT_FOUND.path} component={Default404} />
        <Route component={Default404} />
      </Switch>
      <Footer />
    </>
  );
};

export default Layout;
