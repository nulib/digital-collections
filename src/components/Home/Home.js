import React, { Component } from 'react';
import HeroSection from '../../components/Home/HeroSection';
import HeroSecondarySection from '../../components/Home/HeroSecondarySection';
import PhotoGridSection from '../UI/PhotoGridSection';
import LoadingSpinner from '../UI/LoadingSpinner';
import {
  heroFava,
  heroWPA,
  heroWWII,
  heroWWII_2,
  heroSecondaryData
} from './hero-banners';
import * as elasticsearchApi from '../../api/elasticsearch-api';
import * as elasticsearchParser from '../../services/elasticsearch-parser';
import * as globalVars from '../../services/global-vars';
import { getRandomInt } from '../../services/helpers';

export class Home extends Component {
  constructor(props) {
    super(props);

    // Default number of results we want displayed in the photo grids, on the homepage
    this.numResults = 8;

    this.state = {
      galleryCollections: [],
      galleryItems: [],
      keywordCollections: [],
      loading: true
    };

    // Randomize hero banner image display
    this.heroRandomNumber = getRandomInt(0, 2);
    this.heroItems = [heroFava, heroWPA, heroWWII, heroWWII_2];
  }

  componentDidMount() {
    let promises = [];

    // Combine async network requests
    promises.push(this.getGalleryItems());
    promises.push(this.getFeaturedCollections());
    globalVars.HOMEPAGE_COLLECTION_GROUP_KEYWORDS.forEach(keyword =>
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

    return globalVars.HOMEPAGE_COLLECTION_GROUP_KEYWORDS.map((keyword, i) => {
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
          headline={`${keyword} Collections`}
          items={keywordCollections[i]}
        />
      );
    });
  }

  async getFeaturedCollections() {
    let response = await elasticsearchApi.getCollectionsByKeyword(
      'Featured',
      8
    );

    const collections = elasticsearchParser.prepPhotoGridItems(
      response,
      globalVars.COLLECTION_MODEL
    );

    return collections;
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
      <>
        <div className="relative-wrapper homepage-hero-wrapper contain-1440">
          <HeroSection heroData={this.heroItems[this.heroRandomNumber]} />
        </div>
        <LoadingSpinner loading={loading} />
        {!loading && (
          <div>
            <PhotoGridSection
              headline="Recently Added and Updated Items"
              linkTo="/search"
              linkToText="View All Items"
              items={galleryItems}
              hideDescriptions={true}
            />
            <PhotoGridSection
              headline="Featured Collections"
              linkTo="/collections"
              linkToText="View All Collections"
              items={galleryCollections}
            />
          </div>
        )}
        <div className="contain-1120">
          <HeroSecondarySection heroData={heroSecondaryData} />
          {!loading && this.renderAdditionalGalleries()}
        </div>
      </>
    );
  }
}

export default Home;
