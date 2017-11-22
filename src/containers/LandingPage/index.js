import React, {Component} from 'react';
import HeroSection from '../../components/HeroSection';
import LandingPageCollectionSection from './LandingPageCollectionSection';
import LandingPageSection from './LandingPageSection';
import sectionsData from '../../api/sections-data';
import collectionsData from '../../api/collections-data';
import './LandingPage.css';

class LandingPage extends Component {

  componentDidMount() {
    document.body.className="landing-page";
  }

  render() {
    return (
      <div>
        <HeroSection />
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <LandingPageCollectionSection sectionType={collectionsData.collections} />
            <LandingPageSection sectionType={sectionsData.workTypes} />
          </main>
        </div>
      </div>
    );
  }
}

export default LandingPage;
