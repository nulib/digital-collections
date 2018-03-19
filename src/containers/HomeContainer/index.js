import React, { Component } from 'react';
import HeroSection from '../../components/HeroSection';
import GlobalSearch from '../../components/GlobalSearch';

class HomeContainer extends Component {
  componentDidMount() {
    document.body.className = 'landing-page';
  }

  render() {
    return (
      <div>
        <div className="relative-wrapper homepage-hero-wrapper contain-1440">
          <GlobalSearch />
          <HeroSection />
        </div>
        <div id="page">
          <main id="main-content" className="content" tabIndex="0" />
        </div>
      </div>
    );
  }
}

export default HomeContainer;
