import React, {Component} from 'react';
import HeroSection from '../../components/HeroSection';
import LandingPageSection from './LandingPageSection';
import sectionsData from '../../api/sections-data';
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
            <LandingPageSection sectionType={sectionsData.collections} />
            <LandingPageSection sectionType={sectionsData.creators} />
            <LandingPageSection sectionType={sectionsData.subjects} />
            <LandingPageSection sectionType={sectionsData.workTypes} />
          </main>
        </div>
      </div>
    );
  }
}

export default LandingPage;
