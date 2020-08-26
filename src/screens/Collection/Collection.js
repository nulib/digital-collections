import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getESTitle } from "../../services/elasticsearch-parser";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../../services/google-tag-manager";
import Collection from "../../components/Collection/Collection";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import { generateTitleTag } from "../../services/helpers";
import {
  loadCollectionStructuredData,
  loadCollectionCarouselData
} from "../../services/google-structured-data";

const ScreensCollection = () => {
  const [structuredData, setStructuredData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const collectionTitle = useRef("");
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let mounted = true;

    const request = async () => {
      const response = await elasticsearchApi.getCollection(params.id);
      if (response.error) {
        return;
      }
      collectionTitle.current = getESTitle(response._source);
      populateGTMDataLayer(response._source);
      if (mounted) {
        setStructuredData(
          loadCollectionStructuredData(response._source, location.pathname)
        );
      }
    };
    request();

    const getCollectionItems = async () => {
      const items = await elasticsearchApi.getCollectionItems(params.id, 25);
      if (items.error) {
        return;
      }
      if (mounted) {
        setCarouselData(loadCollectionCarouselData(items));
      }
    };
    getCollectionItems();

    return () => {
      mounted = false;
    };
  }, [params.id, location.pathname]);

  function populateGTMDataLayer() {
    const dataLayer = {
      collections: collectionTitle.current,
      pageTitle: collectionTitle.current
    };
    loadDataLayer(dataLayer);
  }

  return (
    <div className="standard-page">
      <Helmet>
        <title>{generateTitleTag(collectionTitle.current)}</title>
        <title>{collectionTitle.current}</title>
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}

        {carouselData && (
          <script type="application/ld+json">
            {JSON.stringify(carouselData)}
          </script>
        )}
      </Helmet>
      <div id="page" className="collection-items">
        <Collection />
      </div>
    </div>
  );
};

export default ScreensCollection;
