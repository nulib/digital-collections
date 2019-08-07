import React, { Component } from 'react';
import {
  heroFava,
  heroWPA,
  heroWWII,
  heroWWII_2
} from '../../services/hero-banners';
import * as globalVars from '../../services/global-vars';
import { getRandomInt } from '../../services/helpers';
import { Helmet } from 'react-helmet';
import { generateTitleTag } from '../../services/helpers';
import { loadDataLayer } from '../../services/google-tag-manager';
import { loadDefaultStructuredData } from '../../services/google-structured-data';
import Home from '../../components/Home/Home';

export class ScreensHome extends Component {
  constructor(props) {
    super(props);

    // Default number of results we want displayed in the photo grids, on the homepage
    this.numResults = 8;

    this.state = {
      galleryCollections: [],
      galleryItems: [],
      keywordCollections: [],
      loading: true
    };

    // Randomize hero banner image display
    this.heroRandomNumber = getRandomInt(0, 2);
    this.heroItems = [heroFava, heroWPA, heroWWII, heroWWII_2];
  }

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
