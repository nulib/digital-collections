import React, { useState, useEffect } from "react";
import HeroSection from "../../components/Home/HeroSection";
import PhotoBox from "../UI/PhotoBox";
import PhotoFeature from "../UI/PhotoFeature";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { heroFava, heroWPA, heroWWII, heroWWII_2 } from "./hero-banners";
import * as elasticsearchApi from "../../api/elasticsearch-api";
import * as elasticsearchParser from "../../services/elasticsearch-parser";
import * as globalVars from "../../services/global-vars";
import { getRandomInt } from "../../services/helpers";
import { isMobileOnly, isTablet } from "react-device-detect";
// Import Swiper React components
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";

SwiperCore.use([Navigation]);

const Home = () => {
  const numResults = 8;
  const heroRandomNumber = getRandomInt(0, 2);
  const heroItems = [heroFava, heroWPA, heroWWII, heroWWII_2];

  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [keywordCollections, setKeywordCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let promises = [];

    // Combine async network requests
    promises.push(getGalleryItems());
    promises.push(getFeaturedCollections());
    globalVars.HOMEPAGE_COLLECTION_GROUP_KEYWORDS.forEach((keyword) =>
      promises.push(getGalleryByKeyword(keyword))
    );

    // Put results on component state
    Promise.all(promises)
      .then(([galleryItems, featuredCollections, ...keywordCollections]) => {
        setGalleryItems(galleryItems);
        setFeaturedCollections(featuredCollections);
        setKeywordCollections(keywordCollections);
        setLoading(false);
      })
      .catch((error) => console.log("Error grabbing data", error));
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
        <section
          className="section"
          key={keyword}
          data-testid="section-additional-collection-gallery"
        >
          <div className="section-top contain-1440">
            <p className="subhead" style={{ textTransform: "capitalize" }}>
              {keyword} Collections
            </p>
          </div>
          <Swiper
            spaceBetween={isMobileOnly ? 0 : isTablet ? 10 : 0}
            slidesPerView={isMobileOnly ? 1 : isTablet ? 2 : 3}
            navigation
          >
            {keywordCollections[i].map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="photo-feature-3-across"
                  style={{ marginTop: 0 }}
                >
                  <PhotoFeature item={item} styles={{ width: "100%" }} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      );
    });
  }

  async function getFeaturedCollections() {
    let response = await elasticsearchApi.getFeaturedCollections(8);
    console.log("getFeaturedCollections() response", response);
    const collections = elasticsearchParser.prepPhotoFeatureItems(
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
        <section className="section" data-testid="section-featured-collections">
          <div className="section-top contain-1440">
            <h3 data-testid="headline-photo-feature-section">Collections</h3>
            <p className="subhead">Featured Collections</p>
            <p>
              <Link data-testid="link-photo-feature-section" to="/collections">
                View All Collections
              </Link>
            </p>
          </div>
          <Swiper
            spaceBetween={isMobileOnly ? 0 : isTablet ? 10 : 0}
            slidesPerView={isMobileOnly ? 1 : isTablet ? 2 : 3}
            navigation
          >
            {featuredCollections.map((item, i) => (
              <SwiperSlide key={item.id || i}>
                <div
                  className="photo-feature-3-across"
                  style={{ marginTop: 0 }}
                >
                  <PhotoFeature item={item} styles={{ width: "100%" }} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
      {!loading && renderAdditionalGalleries()}
      <section className="section" data-testid="section-recent-items">
        <div className="section-top contain-970">
          <h3 data-testid="headline-photo-grid-section">Works</h3>
          <p className="subhead">Recently Added and Updated Works</p>
          <p>
            <Link data-testid="link-photo-grid-section" to="/search">
              View All Works
            </Link>
          </p>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={isMobileOnly ? 1 : isTablet ? 2 : 4}
          navigation
          className="photobox-swiper"
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div align="center">
                <PhotoBox hideDescriptions={true} item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Home;
