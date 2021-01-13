import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getESTitle } from "../../services/elasticsearch-parser";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../../services/google-tag-manager";
import Collection from "../../components/Collection/Collection";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import { generateTitleTag } from "../../services/helpers";
import { loadCollectionStructuredData } from "../../services/google-structured-data";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

const ScreensCollection = () => {
  const [structuredData, setStructuredData] = useState({});
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

    return () => {
      mounted = false;
    };
  }, [params.id, location.pathname]);

  function populateGTMDataLayer() {
    const dataLayer = {
      collections: collectionTitle.current,
      pageTitle: collectionTitle.current,
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
      </Helmet>
      <div id="page" className="collection-items">
        <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
          <Collection />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ScreensCollection;
