import React, { Component } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import { loadDataLayer } from '../services/google-tag-manager';
import { ROUTES } from '../services/global-vars';

const breadCrumbs = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: ROUTES.PAGE_NOT_FOUND.title
  }
];

class ContactUs extends Component {
  componentDidMount() {
    loadDataLayer({ pageTitle: ROUTES.PAGE_NOT_FOUND.title });
  }

  render() {
    const { title } = ROUTES.PAGE_NOT_FOUND;

    return (
      <div className="standard-page narrow-page">
        <Helmet>
          <title>{generateTitleTag(title)}</title>
        </Helmet>
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <Breadcrumbs items={breadCrumbs} />
            <h2>{title}</h2>
            <p>{`We're sorry, this page does not exist.`}</p>
          </main>
        </div>
      </div>
    );
  }
}

export default ContactUs;
