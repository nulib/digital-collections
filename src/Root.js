import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './containers/Layout';
// eslint-disable-next-line
import FontAwesomeContainer from './containers/FontAwesomeContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
