import React, { useState, useEffect } from "react";
import HeroSection from "../../components/Home/HeroSection";
import HeroSecondarySection from "../../components/Home/HeroSecondarySection";
import PhotoGridSection from "../UI/PhotoGridSection";
import PhotoFeatureSection from "../UI/PhotoFeatureSection";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  heroFava,
  heroWPA,
  heroWWII,
  heroWWII_2,
  heroSecondaryData
} from "./hero-banners";
import * as elasticsearchApi from "../../api/elasticsearch-api";
import * as elasticsearchParser from "../../services/elasticsearch-parser";
import * as globalVars from "../../services/global-vars";
import { getRandomInt } from "../../services/helpers";

const Home = () => {
  const numResults = 8;
  const heroRandomNumber = getRandomInt(0, 2);
  const heroItems = [heroFava, heroWPA, heroWWII, heroWWII_2];

  const [galleryCollections, setGalleryCollections] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [keywordCollections, setKeywordCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let promises = [];

    // Combine async network requests
    promises.push(getGalleryItems());
    promises.push(getFeaturedCollections());
    globalVars.HOMEPAGE_COLLECTION_GROUP_KEYWORDS.forEach(keyword =>
      promises.push(getGalleryByKeyword(keyword))
    );

    // Put results on component state
    Promise.all(promises)
      .then(([galleryItems, galleryCollections, ...keywordCollections]) => {
        setGalleryItems(galleryItems);
        setGalleryCollections(galleryCollections);
        setKeywordCollections(keywordCollections);
        setLoading(false);
      })
      .catch(error => console.log("Error grabbing data", error));
  }, []);

  function renderAdditionalGalleries() {
    return globalVars.HOMEPAGE_COLLECTION_GROUP_KEYWORDS.map((keyword, i) => {
      // No values (yet), just return
      if (
        keywordCollections.length === 0 ||
        keywordCollections[i].length === 0
      ) {
        return null;
      }

      return (
        <PhotoFeatureSection
          key={keyword}
          headline={`${keyword} Collections`}
          items={keywordCollections[i]}
          itemsPerRow={3}
        />
      );
    });
  }

  async function getFeaturedCollections() {
    let response = await elasticsearchApi.getCollectionsByKeyword(
      "Featured",
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
  async function getGalleryByKeyword(keyword) {
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
  async function getGalleryItems() {
    let response = await elasticsearchApi.getRecentlyDigitizedItems(numResults);
    const items = elasticsearchParser.prepPhotoGridItems(
      response,
      globalVars.IMAGE_MODEL
    );

    return items;
  }

  return (
    <>
      <div className="relative-wrapper homepage-hero-wrapper contain-1440">
        <HeroSection heroData={heroItems[heroRandomNumber]} />
      </div>
      <LoadingSpinner loading={loading} />

      {!loading && (
        <div>
          <PhotoFeatureSection
            subhead="Featured Collections"
            headline="Collections"
            linkTo="/collections"
            linkToText="View All Collections"
            items={galleryCollections}
            data-testid="section-featured-collections"
            itemsPerRow={3}
          />
        </div>
      )}
      <div className="contain-1120">
        <HeroSecondarySection heroData={heroSecondaryData} />
        {!loading && renderAdditionalGalleries()}
      </div>
      <PhotoGridSection
        headline="Recently Added and Updated Items"
        linkTo="/search"
        linkToText="View All Items"
        items={galleryItems}
        hideDescriptions={true}
        data-testid="section-recent-items"
      />
    </>
  );
};

export default Home;
