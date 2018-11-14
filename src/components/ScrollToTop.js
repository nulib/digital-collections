import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ScrollToTop);
