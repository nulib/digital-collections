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
            {`Northwestern University Library's Repository and Digital Curation
            department is located in the main library on our Evanston campus.
            The main library contains the bulk of the library holdings and
            houses several notable departments and collections.`}
          </p>
          <h3>Hours</h3>
          <p>
            Mon-Fri: 8:00 am – 6:00 pm
            <br />
            Sat: 10:00 am – 6:00 pm
            <br />
            Sun: Open 10am - 6pm
          </p>
          <h3>Location</h3>
          <p>1970 Campus Drive, Evanston, IL 60208</p>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
