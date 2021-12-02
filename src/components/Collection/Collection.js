import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import ErrorSection from "components/UI/ErrorSection";
import FacetsSidebar from "components/UI/FacetsSidebar";
import Breadcrumbs from "components/UI/Breadcrumbs/Breadcrumbs";
import LoadingSpinner from "components/UI/LoadingSpinner";
import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  simpleQueryStringQuery,
} from "services/reactive-search";
import { useSelector } from "react-redux";

import { ROUTES } from "../../services/global-vars";
import CollectionDescription from "./CollectionDescription";
import FiltersShowHideButton from "components/UI/FiltersShowHideButton";
import WrappedReactiveList from "components/Collection/WrappedReactiveList";

const Collection = () => {
  const [collection, setCollection] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState();
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    function getApiData() {
      getCollection();
    }

    function getCollection() {
      const { id } = params;
      const request = async () => {
        const response = await elasticsearchApi.getCollection(id);
        let error = null;

        // Handle errors
        // Generic error
        if (response.error) {
          return handle404redirect(response.error.reason);
        }
        // Collection not found
        else if (!response.found) {
          return handle404redirect();
        }
        // Restricted collection
        else if (response._source.visibility === "restricted") {
          error = `The current collection's visibility is restricted.`;
        }
        // Authentication problem
        else if (
          response._source.visibility === "authenticated" &&
          !auth.token
        ) {
          error = `The current collection's visibility is restricted to logged in users.`;
        }

        setCollection(response._source);
        setError(error);
        setLoading(false);
      };
      request();
    }

    function handle404redirect(
      message = "There was an error retrieving the collection, or the collection id does not exist."
    ) {
      history.push(ROUTES.PAGE_NOT_FOUND.path, {
        message,
      });
    }

    setLoading(true);
    getApiData();
  }, [location, params, history, auth.token]);

  function createBreadcrumbData(collection) {
    let crumbs = [{ title: "Collections", link: "/collections" }];

    if (collection) {
      crumbs.push({
        title: collection.title || "No title",
        link: "",
      });
    }
    return crumbs;
  }

  const handleDisplaySidebarClick = (e) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  const breadCrumbData = collection ? createBreadcrumbData(collection) : [];
  const collectionTitle = collection?.title;
  const collectionDescription = collection?.description;

  const renderDisplay = () => {
    if (error) {
      return <ErrorSection message={error} />;
    }

    // This check ensures that the new collection's data is freshly rendered on a route id change
    if (loading) {
      return null;
    }
    if (collection) {
      return (
        <div>
          <FacetsSidebar
            searchBarComponentId={COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID}
            showSidebar={showSidebar}
          />
          <main
            id="main-content"
            className={`content ${!showSidebar ? "extended" : ""}`}
            tabIndex="-1"
          >
            <Breadcrumbs items={breadCrumbData} />

            <h2>{collectionTitle}</h2>

            <div
              data-testid="collection-description"
              style={{ whiteSpace: "pre-line" }}
            >
              <CollectionDescription description={collectionDescription} />
            </div>

            {!loading && (
              <div>
                <DataSearch
                  customQuery={simpleQueryStringQuery}
                  autosuggest={false}
                  className="datasearch web-form"
                  componentId={COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID}
                  dataField={["full_text"]}
                  filterLabel="Collections search"
                  innerClass={{
                    input: "searchbox rs-search-input is-fullwidth",
                    list: "suggestionlist",
                  }}
                  queryFormat="or"
                  placeholder="Search within collection"
                  showFilter={true}
                  URLParams={true}
                />

                <SelectedFilters className="rs-selected-filters" />

                <FiltersShowHideButton
                  showSidebar={showSidebar}
                  handleToggleFiltersClick={handleDisplaySidebarClick}
                />

                <WrappedReactiveList collectionId={collection?.id} />
              </div>
            )}
          </main>
        </div>
      );
    }
  };

  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      {renderDisplay()}
    </>
  );
};

export default Collection;
