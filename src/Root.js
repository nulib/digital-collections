import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./screens/Layout";
import ScrollToTop from "./components/UI/ScrollToTop";
import registerFaIcons from "./registerFaIcons";

registerFaIcons();

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <Layout />
      </ScrollToTop>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
