import React, { Component } from 'react';
import HeroSection from '../components/Home/HeroSection';
import CarouselSection from '../components/CarouselSection';
import HeroSecondarySection from '../components/Home/HeroSecondarySection';
import { heroData } from '../api/heros';
import { heroSecondaryData } from '../api/heros';
import { connect } from 'react-redux';
import { handleUpdateBodyClass } from '../actions';
import { fetchCarouselItems, CAROUSELS } from '../actions/carousels';

export class HomePage extends Component {
  constructor(props) {
    super(props);

    ////////////////////////////////////////////////////////
    // Carousel collections defined by collection keyword
    // /////////////////////////////////////////////////////
    this.carouselsByKeyword = [
      'Posters',
      'Photography',
      'Berkeley Folk Music Festival'
    ];
  }
  componentDidMount() {
    this.handleBodyClassUpdate();

    // Dispatch redux thunk action creators to grab async api data
    this.props.fetchCarouselItems(CAROUSELS.RECENTLY_DIGITIZED_ITEMS);
    this.props.fetchCarouselItems(CAROUSELS.RECENTLY_DIGITIZED_COLLECTIONS);
    this.carouselsByKeyword.forEach(title =>
      this.props.fetchCarouselItems(title)
    );
  }

  handleBodyClassUpdate() {
    const page = document.getElementById('page');
    if (page) {
      page.classList.remove('standard-margin');
    }
    this.props.handleUpdateBodyClass('landing-page');
  }

  createCarousels() {
    const { carousels } = this.props;

    return this.carouselsByKeyword.map(keyword => {
      const keywordCarousel = carousels[keyword];

      if (keywordCarousel && keywordCarousel.items.length > 0) {
        return (
          <CarouselSection
            key={keyword}
            sectionTitle={keyword}
            linkTo=""
            items={keywordCarousel.items}
            slidesPerView={4}
            loading={keywordCarousel.loading}
            error={keywordCarousel.error}
          />
        );
      } else {
        return '';
      }
    });
  }

  render() {
    const {
      recentlyDigitizedItems = {},
      recentlyDigitizedCollections = {}
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
            loading={recentlyDigitizedItems.loading}
            error={recentlyDigitizedItems.error}
          />
          <CarouselSection
            sectionTitle="Recently Digitized and Updated Collections"
            linkTo=""
            items={recentlyDigitizedCollections.items}
            slidesPerView={4}
          />
          <HeroSecondarySection heroData={heroSecondaryData} />
          {this.createCarousels()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carousels: state.carousels
});

const mapDispatchToProps = dispatch => ({
  handleUpdateBodyClass: bodyClass =>
    dispatch(handleUpdateBodyClass(bodyClass)),
  fetchCarouselItems: title => dispatch(fetchCarouselItems(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
