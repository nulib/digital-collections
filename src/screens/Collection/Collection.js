import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { getESTitle } from "../../services/elasticsearch-parser";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../../services/google-tag-manager";
import Collection from "../../components/Collection/Collection";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import { generateTitleTag } from "../../services/helpers";
import { loadCollectionStructuredData } from "../../services/google-structured-data";
import PropTypes from "prop-types";

const ScreensCollection = ({ location, match }) => {
  const [structuredData, setStructuredData] = useState({});
  const collectionTitle = useRef("");

  useEffect(() => {
    let mounted = true;

    const request = async () => {
      const response = await elasticsearchApi.getCollection(match.params.id);

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
  }, [match.params.id, location.pathname]);

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
      </Helmet>
      <div id="page" className="collection-items">
        <Collection />
      </div>
    </div>
  );
};

ScreensCollection.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  })
};

export default withRouter(ScreensCollection);
