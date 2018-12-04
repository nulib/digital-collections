import React, { Component } from 'react';
import HeroSection from '../components/Home/HeroSection';
import HeroSecondarySection from '../components/Home/HeroSecondarySection';
import PhotoGridSection from '../components/PhotoGridSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { heroFava, heroWPA, heroSecondaryData } from '../api/heros';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import * as elasticsearchParser from '../services/elasticsearch-parser';
import * as globalVars from '../services/global-vars';

export class HomePageContainer extends Component {
  constructor(props) {
    super(props);

    ////////////////////////////////////////////////////////
    // Gallery items defined by collection keyword
    // /////////////////////////////////////////////////////
    this.galleryKeywords = [
      'Posters',
      'Photography',
      'Berkeley Folk Music Festival'
    ];

    // Default number of results we want displayed in the photo grids, on the homepage
    this.numResults = 8;

    this.state = {
      galleryCollections: [],
      galleryItems: [],
      keywordCollections: [],
      loading: true
    };

    // For now randomly (50%) display alternate hero image
    this.heroBool = Math.random() >= 0.5;
  }

  componentDidMount() {
    let promises = [];

    // Combine async network requests
    promises.push(this.getGalleryItems());
    promises.push(this.getGalleryCollections());
    this.galleryKeywords.forEach(keyword =>
      promises.push(this.getGalleryByKeyword(keyword))
    );

    // Put results on component state
    Promise.all(promises)
      .then(([galleryItems, galleryCollections, ...keywordCollections]) => {
        this.setState({
          galleryItems: galleryItems,
          galleryCollections: galleryCollections,
          keywordCollections,
          loading: false
        });
      })
      .catch(error => console.log('Error grabbing data', error));
  }

  renderAdditionalGalleries() {
    const { keywordCollections } = this.state;

    return this.galleryKeywords.map((keyword, i) => {
      // No values (yet), just return
      if (
        keywordCollections.length === 0 ||
        keywordCollections[i].length === 0
      ) {
        return null;
      }

      return (
        <PhotoGridSection
          key={keyword}
          headline={`${keyword} Collection Items`}
          linkTo=""
          linkToText="View All Collections of this type"
          items={keywordCollections[i]}
        />
      );
    });
  }

  /**
   * Get collections by keyword
   */
  async getGalleryByKeyword(keyword) {
    let response = await elasticsearchApi.getCollectionsByKeyword(keyword);
    const items = elasticsearchParser.prepPhotoGridItems(
      response,
      globalVars.COLLECTION_MODEL
    );

    return items;
  }

  /**
   * Get all collections
   */
  async getGalleryCollections() {
    let response = await elasticsearchApi.getAllCollections(this.numResults);
    const items = elasticsearchParser.prepPhotoGridItems(
      response,
      globalVars.COLLECTION_MODEL
    );

    return items;
  }

  /**
   * Get recently digitized items
   */
  async getGalleryItems() {
    let response = await elasticsearchApi.getRecentlyDigitizedItems(
      this.numResults
    );
    const items = elasticsearchParser.prepPhotoGridItems(
      response,
      globalVars.IMAGE_MODEL
    );

    return items;
  }

  render() {
    const { galleryCollections, galleryItems, loading } = this.state;

    return (
      <div className="landing-page">
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <div className="relative-wrapper homepage-hero-wrapper contain-1440">
              <HeroSection heroData={this.heroBool ? heroWPA : heroFava} />
            </div>
            <div className="standard-page contain-1120">
              <LoadingSpinner loading={loading} />
              {!loading && (
                <div>
                  <PhotoGridSection
                    headline="Recently Digitized Items"
                    linkTo="/search"
                    linkToText="View All Items"
                    items={galleryItems}
                  />
                  <PhotoGridSection
                    headline="Recently Digitized and Updated Collections"
                    linkTo="/collections"
                    linkToText="View All Collections"
                    items={galleryCollections}
                  />
                </div>
              )}

              <HeroSecondarySection heroData={heroSecondaryData} />
              {!loading && this.renderAdditionalGalleries()}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default HomePageContainer;
