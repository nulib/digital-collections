import React, { Component } from 'react';
import HeroSection from '../../components/Home/HeroSection';
import GlobalSearch from '../../components/GlobalSearch';
import CarouselSection from '../../components/CarouselSection';
import HeroSecondarySection from '../../components/Home/HeroSecondarySection';
import { recentlyDigitizedItems } from '../../api/mock-data/recently-digitized-items';
import { recentlyDigitizedCollections } from '../../api/mock-data/recently-digitized-collections';
import { photographyCollections } from '../../api/mock-data/photography-collections';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyDigitizedItems: [],
      recentlyDigitizedCollections: []
    };
  }

  componentDidMount() {
    //document.body.class = 'landing-page';
    this.setState({
      recentlyDigitizedItems: this.getRecentlyDigitizedItems(),
      recentlyDigitizedCollections: this.getRecentlyDigitizedCollections(),
      photographyCollections: this.getPhotographyCollections()
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

  getPhotographyCollections() {
    // Put AJAX / fetch here to grab data
    return photographyCollections;
  }

  render() {
    const { recentlyDigitizedItems, recentlyDigitizedCollections } = this.state;
    const heroData = {
      title: 'Berkeley Folk Festival',
      subTitle: 'Summer of love - collection description here',
      collectionId: 'asdf0986asdf09',
      heroImage: 'alice-at-the-greek-1440x600.png'
    };
    const heroSecondaryData = {
      title: 'Historic Postcards',
      subTitle:
        'Browse our collection of Postcards from the University Archives',
      collectionId: 'qweras888',
      imageUrl:
        'https://images.northwestern.edu/image-service/inu-dil-0ec605c7-e63f-4e4f-843d-7b508a2ce1f6/full/,780/0/grey.jpg'
    };

    return (
      <div>
        <div className="relative-wrapper homepage-hero-wrapper contain-1440">
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
              <HeroSecondarySection heroData={heroSecondaryData} />
              <CarouselSection
                sectionTitle="Photography Collections"
                linkTo=""
                items={photographyCollections}
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
