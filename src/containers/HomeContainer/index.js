import React, { Component } from 'react';
import HeroSection from '../../components/HeroSection';
import sectionsData from '../../api/sections-data';

class HomeContainer extends Component {
  componentDidMount() {
    document.body.className = 'landing-page';
  }

  render() {
    return (
      <div>
        <HeroSection />
        <div id="page">
          <main id="main-content" className="content" tabIndex="0" />
        </div>
      </div>
    );
  }
}

export default HomeContainer;
