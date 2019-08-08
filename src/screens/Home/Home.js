import React, { Component } from 'react';
import * as globalVars from '../../services/global-vars';
import { Helmet } from 'react-helmet';
import { generateTitleTag } from '../../services/helpers';
import { loadDataLayer } from '../../services/google-tag-manager';
import { loadDefaultStructuredData } from '../../services/google-structured-data';
import Home from '../../components/Home/Home';

export class ScreensHome extends Component {
  componentDidMount() {
    loadDataLayer({ pageTitle: globalVars.ROUTES.HOME.title });
  }

  render() {
    return (
      <div className="landing-page">
        <Helmet>
          <title>{generateTitleTag()}</title>
          <script type="application/ld+json">
            {JSON.stringify(loadDefaultStructuredData())}
          </script>
        </Helmet>
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <Home />
          </main>
        </div>
      </div>
    );
  }
}

export default ScreensHome;
