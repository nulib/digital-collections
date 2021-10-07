import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import * as elasticsearchParser from "../../services/elasticsearch-parser";
import OpenSeadragonContainer from "./OpenSeadragonContainer";
import { Helmet } from "react-helmet";
import { generateTitleTag } from "../../services/helpers";
import { loadDataLayer } from "../../services/google-tag-manager";
import { loadItemStructuredData } from "../../services/google-structured-data";
import Work from "../../components/Work/Work";
import * as globalVars from "services/global-vars";
import LoadingSpinner from "components/UI/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";
import ErrorSection from "components/UI/ErrorSection";
import useWorkType from "hooks/use-work-type";
import WorkMediaPlayerWrapper from "components/Work/MediaPlayer/Wrapper";

const ScreensWork = () => {
  const [error, setError] = useState();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState();
  const [structuredData, setStructuredData] = useState();

  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const auth = useSelector((state) => state.auth);

  const { isMediaType } = useWorkType();

  useEffect(() => {
    async function getApiData() {
      let item = await getItem();

      if (!item) {
        return;
      }

      populateGTMDataLayer(item);
      setItem(item);
      setLoading(false);
      setStructuredData(loadItemStructuredData(item, location.pathname));
    }

    async function getItem() {
      let itemError = "";
      let itemResponse = await elasticsearchApi.getItem(params.id);
      const { error } = itemResponse;

      // Handle possible errors
      // Generic error
      if (error) {
        if (error.statusCode === 403) {
          itemError = error.reason;
        } else {
          return handle404redirect(itemResponse.error.reason);
        }
      }
      // Item not found
      else if (!itemResponse.found) {
        return handle404redirect();
      }
      // Restricted item
      else if (itemResponse._source.visibility === "restricted") {
        itemError = `The current item's visibility is restricted.`;
      }
      // Authenticated
      else if (
        itemResponse._source.visibility === "authenticated" &&
        !auth.token
      ) {
        itemError = `The current item's visibility is restricted to logged in users.`;
      }

      return itemError
        ? setError(itemError)
        : { id: itemResponse._id, ...itemResponse._source };
    }

    function handle404redirect(
      message = "There was an error retrieving the item, or the item id does not exist."
    ) {
      history.push(globalVars.ROUTES.PAGE_NOT_FOUND.path, {
        message,
      });
    }

    if (location) {
      getApiData();
    }
  }, [auth, history, location, params]);

  function populateGTMDataLayer(item) {
    const rightsStatement = item.descriptiveMetadata.rightsStatement?.label;
    const creators = item.descriptiveMetadata.creator?.map(
      (x) => x.term?.label
    );
    const contributors = item.descriptiveMetadata.contributor?.map(
      (x) => x.term?.label
    );

    const dataLayer = {
      adminset: item.administrativeMetadata.libraryUnit?.label,
      collections: item.collection?.title,
      creatorsContributors: [...creators, ...contributors],
      pageTitle: elasticsearchParser.getESTitle(item),
      rightsStatement,
      subjects: item.descriptiveMetadata.subject.map((x) => x.term?.label),
      visibility: item.visibility?.label,
    };

    loadDataLayer(dataLayer);
  }

  // This check ensures that when changing ids (items) on the same route, the "id" is different
  // at this point of execution
  const idInSync = item && params.id === item.id;

  const itemTitle = item ? elasticsearchParser.getESTitle(item) : "";

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <div className="landing-page">
      <Helmet>
        <title>{generateTitleTag(itemTitle)}</title>
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
        <link
          rel="canonical"
          href={`https://dc.library.northwestern.edu${location.pathname}`}
        />
      </Helmet>
      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        {error && <ErrorSection>{error}</ErrorSection>}

        {item && idInSync && !error && !isMediaType(item.workType) && (
          <OpenSeadragonContainer item={item} />
        )}

        {item && isMediaType(item.workType) && (
          <WorkMediaPlayerWrapper manifestId={item.iiifManifest} />
        )}

        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            {item && item.hasOwnProperty("id") && <Work work={item} />}
          </main>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default ScreensWork;
