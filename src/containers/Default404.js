import React, { Component } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import { loadDataLayer } from '../services/google-tag-manager';
import { ROUTES } from '../services/global-vars';
import { withRouter } from 'react-router-dom';

const breadCrumbs = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: ROUTES.PAGE_NOT_FOUND.title
  }
];

class Default404 extends Component {
  componentDidMount() {
    loadDataLayer({ pageTitle: ROUTES.PAGE_NOT_FOUND.title });
  }

  render() {
    const { title } = ROUTES.PAGE_NOT_FOUND;
    const { location } = this.props.history;
    let message = `We're sorry, this page does not exist.`;

    if (location.state && location.state.message) {
      message = location.state.message;
    }

    return (
      <div className="standard-page narrow-page">
        <Helmet>
          <title>{generateTitleTag(title)}</title>
        </Helmet>
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <Breadcrumbs items={breadCrumbs} />
            <h2>{title}</h2>
            <p>{message}</p>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(Default404);
