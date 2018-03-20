import React, { Component } from 'react';
import HeroSection from '../../components/HeroSection';
import GlobalSearch from '../../components/GlobalSearch';

class HomeContainer extends Component {
  componentDidMount() {
    document.body.className = 'landing-page';
  }

  render() {
    const heroData = {
      title: 'Berkeley Folk Festival',
      subTitle: 'Summer of love - collection description here',
      collectionId: 'asdf0986asdf09',
      heroImage: 'alice-at-the-greek-1440x600.png'
    };

    return (
      <div>
        <div className="relative-wrapper homepage-hero-wrapper contain-1440">
          <GlobalSearch />
          <HeroSection heroData={heroData} />
        </div>
        <div id="page">
          <main id="main-content" className="content" tabIndex="0" />
        </div>
      </div>
    );
  }
}

export default HomeContainer;
