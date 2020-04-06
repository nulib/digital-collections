import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import ErrorSection from "../UI/ErrorSection";
import FacetsSidebar from "../UI/FacetsSidebar";
import Breadcrumbs from "../UI/Breadcrumbs/Breadcrumbs";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  DataSearch,
  ReactiveList,
  SelectedFilters
} from "@appbaseio/reactivesearch";
import {
  getESDescription,
  getESImagePath,
  getESTitle
} from "../../services/elasticsearch-parser";
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  collectionDefaultQuery,
  reactiveSearchFacets,
  simpleQueryStringQuery
} from "../../services/reactive-search";
import { useSelector } from "react-redux";
import PhotoBox from "../UI/PhotoBox";
import { ROUTES } from "../../services/global-vars";
import { isMobile } from "react-device-detect";
import CollectionDescription from "./CollectionDescription";
import FiltersShowHideButton from "../UI/FiltersShowHideButton";

const styles = {
  mobileDescription: {
    marginBottom: "2rem"
  }
};

const Collection = () => {
  const [collection, setCollection] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState();
  const [searchVal, setSearchValue] = useState();
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const auth = useSelector(state => state.auth);

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
        message
      });
    }

    setLoading(true);
    getApiData();
  }, [location, params, history, auth.token]);

  // TODO: Move this, and grabbing the collection itself request, up to the screen component
  function createBreadcrumbData(collection) {
    let crumbs = [{ title: "Collections", link: "/collections" }];

    if (collection) {
      crumbs.push({
        title: getESTitle(collection),
        link: ""
      });
    }
    return crumbs;
  }

  const defaultQuery = () => {
    return collection ? collectionDefaultQuery(collection.id) : null;
  };

  const handleDisplaySidebarClick = e => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  function renderItem(res) {
    let item = {
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  }

  const sortOptions = [
    {
      sortBy: "asc",
      dataField: "modified_date",
      label: "Sort By Modified Date"
    },
    {
      sortBy: "desc",
      dataField: "_score",
      label: "Sort By Relevancy"
    },
    {
      sortBy: "asc",
      dataField: "title.primary.keyword",
      label: "Sort By Title"
    }
  ];

  const breadCrumbData = collection ? createBreadcrumbData(collection) : [];
  const collectionTitle = collection ? getESTitle(collection) : "";
  const collectionDescription = collection ? getESDescription(collection) : "";

  // Split the description by line breaks, so it displays properly
  const descriptionDisplay = collectionDescription
    .split("\n")
    .map((i, key) => <p key={key}>{i}</p>);

  const allFilters = [
    COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
    ...reactiveSearchFacets.map(facet => facet.value)
  ];
  const imageFacetsNoCollection = reactiveSearchFacets.filter(
    facet => facet.value !== "Collection"
  );

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
            facets={imageFacetsNoCollection}
            filters={allFilters}
            showSidebar={showSidebar}
          />
          <main
            id="main-content"
            className={`content ${!showSidebar ? "extended" : ""}`}
            tabIndex="-1"
          >
            <Breadcrumbs items={breadCrumbData} />
            {!loading && (
              <div>
                {!isMobile && (
                  <div id="sidebar">
                    <div className="box">
                      <h3>Collection Description</h3>
                      {descriptionDisplay}
                    </div>
                  </div>
                )}

                <h2>{collectionTitle}</h2>

                {isMobile && (
                  <div style={styles.mobileDescription}>
                    <CollectionDescription description={descriptionDisplay} />
                  </div>
                )}

                <DataSearch
                  customQuery={simpleQueryStringQuery}
                  autosuggest={false}
                  className="datasearch web-form"
                  componentId={COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID}
                  dataField={["full_text"]}
                  filterLabel="Collections search"
                  innerClass={{
                    input: "searchbox rs-search-input",
                    list: "suggestionlist"
                  }}
                  onValueChange={function(value) {
                    setSearchValue(value);
                  }}
                  queryFormat="or"
                  placeholder="Search within collection"
                  showFilter={true}
                  URLParams={false}
                />

                <SelectedFilters className="rs-selected-filters" />

                <FiltersShowHideButton
                  showSidebar={showSidebar}
                  handleToggleFiltersClick={handleDisplaySidebarClick}
                />

                <ReactiveList
                  componentId="collection-items-results"
                  dataField="title"
                  react={{
                    and: [...allFilters]
                  }}
                  defaultQuery={defaultQuery}
                  loader={<LoadingSpinner loading={true} />}
                  size={12}
                  pages={10}
                  pagination={true}
                  paginationAt="bottom"
                  renderItem={renderItem}
                  innerClass={{
                    list: "rs-result-list photo-grid three-grid",
                    pagination: "rs-pagination",
                    resultsInfo: "rs-results-info"
                  }}
                  sortOptions={sortOptions}
                  defaultSortOption={
                    searchVal ? "Sort By Relevancy" : "Sort By Title"
                  }
                />
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
