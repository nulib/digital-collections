import React, { Component } from 'react';
import HeroSection from '../../components/Home/HeroSection';
import GlobalSearch from '../../components/GlobalSearch';
import CarouselSection from '../../components/CarouselSection';
import { Link } from 'react-router-dom';
import { recentlyDigitizedItems } from '../../api/mock-data/recently-digitized-items';
import { recentlyDigitizedCollections } from '../../api/mock-data/recently-digitized-collections';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyDigitizedItems: [],
      recentlyDigitizedCollections: []
    };
  }

  componentDidMount() {
    document.body.class = 'landing-page';
    this.setState({
      recentlyDigitizedItems: this.getRecentlyDigitizedItems(),
      recentlyDigitizedCollections: this.getRecentlyDigitizedCollections()
    });
  }

  getRecentlyDigitizedItems() {
    // Put AJAX / fetch here to grab data
    return recentlyDigitizedItems;
  }

  getRecentlyDigitizedCollections() {
    // Put AJAX / fetch here to grab data
    return recentlyDigitizedCollections;
  }

  render() {
    const { recentlyDigitizedItems, recentlyDigitizedCollections } = this.state;
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
          <main id="main-content" className="content" tabIndex="0">
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
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
