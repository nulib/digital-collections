import React from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';

const breadCrumbs = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Contact Us'
  }
];

const ContactUs = props => {
  return (
    <div className="standard-page narrow-page">
      <Helmet>
        <title>{generateTitleTag('Contact Us')}</title>
      </Helmet>
      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Breadcrumbs items={breadCrumbs} />
          <h2>Contact Us</h2>
          <p>
            Northwestern University Libraries' Repository and Digital Curation
            department is located in the main library on our Evanston campus.
            The department is responsible for digitization of library
            collections, describing content, and creating the software that runs
            this website.
          </p>

          <p>
            Questions about digitization, description of items, or software can
            be directed here.{' '}
            <a href="mailto:repository@northwestern.edu">
              repository@northwestern.edu
            </a>
          </p>

          <p>
            The content on the site comes from multiple library collections,
            departments and units. Please visit{' '}
            <a
              href="https://www.library.northwestern.edu/research/research-support/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Research Support
            </a>{' '}
            to find the contact information for the library department that can
            best offer research assistance.
          </p>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
