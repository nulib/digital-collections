import React, { Component } from 'react';
import HeroSection from '../components/Home/HeroSection';
import CarouselSection from '../components/CarouselSection';
import HeroSecondarySection from '../components/Home/HeroSecondarySection';
import MockClient from '../api/client/mock-client';
import { heroData } from '../api/heros';
import { heroSecondaryData } from '../api/heros';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyDigitizedItems: [],
      recentlyDigitizedCollections: [],
      photographyCollections: []
    };
    this.updateCarouselData = this.updateCarouselData.bind(this);
    this.mockClient = new MockClient();

    // Add 'landing-page' class to <body> so the hero image displays properly
    document
      .getElementsByTagName('body')[0]
      .setAttribute('class', 'landing-page');
  }

  componentDidMount() {
    // Mock urls to feed json data for testing
    const urls = [
      '/json/mock/recently-digitized-items.js',
      '/json/mock/recently-digitized-collections.js',
      '/json/mock/photography-collections.js'
    ];
    const grabData = url => this.mockClient.getData(url);
    // Fetch all three carousel's data at once asynchronously via Promise.all
    Promise.all(urls.map(grabData)).then(response => {
      console.log('response', response);
      this.updateCarouselData(response);
    });
  }

  updateCarouselData(response) {
    this.setState({
      recentlyDigitizedItems: response[0],
      recentlyDigitizedCollections: response[1],
      photographyCollections: response[2]
    });
  }

  render() {
    const {
      recentlyDigitizedItems,
      recentlyDigitizedCollections,
      photographyCollections
    } = this.state;

    return (
      <div>
        <div className="relative-wrapper homepage-hero-wrapper contain-1440">
          <HeroSection heroData={heroData} />
        </div>
        <section className="standard-page contain-1120">
          <CarouselSection
            sectionTitle="Recently Digitized Items"
            linkTo=""
            items={recentlyDigitizedItems}
            slidesPerView={6}
          />
          <CarouselSection
            sectionTitle="Recently Digitized and Updated Collections"
            linkTo=""
            items={recentlyDigitizedCollections}
            slidesPerView={4}
          />
          <HeroSecondarySection heroData={heroSecondaryData} />
          <CarouselSection
            sectionTitle="Photography Collections"
            linkTo=""
            items={photographyCollections}
            slidesPerView={4}
          />
        </section>
      </div>
    );
  }
}

export default HomeContainer;
