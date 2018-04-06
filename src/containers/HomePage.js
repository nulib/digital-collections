import React, { Component } from 'react';
import HeroSection from '../components/Home/HeroSection';
import CarouselSection from '../components/CarouselSection';
import HeroSecondarySection from '../components/Home/HeroSecondarySection';
import { heroData } from '../api/heros';
import { heroSecondaryData } from '../api/heros';
import { connect } from 'react-redux';
import { fetchCarouselItems, CAROUSELS } from '../actions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    // Add 'landing-page' class to <body> so the hero image displays properly
    document
      .getElementsByTagName('body')[0]
      .setAttribute('class', 'landing-page');
  }

  componentDidMount() {
    // Dispatch redux thunk action creators to grab async api data
    this.props.dispatch(
      fetchCarouselItems(
        '/json/mock/recently-digitized-items.js',
        CAROUSELS.RECENTLY_DIGITIZED_ITEMS
      )
    );

    this.props.dispatch(
      fetchCarouselItems(
        '/json/mock/recently-digitized-collections.js',
        CAROUSELS.RECENTLY_DIGITIZED_COLLECTIONS
      )
    );

    this.props.dispatch(
      fetchCarouselItems(
        '/json/mock/photography-collections.js',
        CAROUSELS.PHOTOGRAPHY_COLLECTIONS
      )
    );
  }

  render() {
    const {
      recentlyDigitizedItems = {},
      recentlyDigitizedCollections = {},
      photographyCollections = {}
    } = this.props.carousels;

    return (
      <div>
        <div className="relative-wrapper homepage-hero-wrapper contain-1440">
          <HeroSection heroData={heroData} />
        </div>
        <section className="standard-page contain-1120">
          <CarouselSection
            sectionTitle="Recently Digitized Items"
            linkTo=""
            items={recentlyDigitizedItems.items}
            slidesPerView={6}
          />
          <CarouselSection
            sectionTitle="Recently Digitized and Updated Collections"
            linkTo=""
            items={recentlyDigitizedCollections.items}
            slidesPerView={4}
          />
          <HeroSecondarySection heroData={heroSecondaryData} />
          <CarouselSection
            sectionTitle="Photography Collections"
            linkTo=""
            items={photographyCollections.items}
            slidesPerView={4}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carousels: state.carouselReducer
});

export default connect(mapStateToProps)(HomePage);
