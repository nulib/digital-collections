import React, { useState, useEffect } from "react";
import {
  DataSearch,
  SelectedFilters,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import {
  getESImagePath,
  getESTitle,
} from "../../services/elasticsearch-parser";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  DATASEARCH_PLACEHOLDER,
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  imagesOnlyDefaultQuery,
  reactiveSearchFacets,
  simpleQueryStringQuery,
} from "../../services/reactive-search";
import PhotoBox from "../UI/PhotoBox";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../services/global-vars";
import FacetsSidebar from "../UI/FacetsSidebar";
import Breadcrumbs from "../UI/Breadcrumbs/Breadcrumbs";
import { loadDataLayer } from "../../services/google-tag-manager";
import FiltersShowHideButton from "../UI/FiltersShowHideButton";
import { useDispatch } from "react-redux";
import { searchValueChange } from "../../actions/search";
import PropTypes from "prop-types";

const Search = ({ breadcrumbs = [] }) => {
  const [externalFacet, setExternalFacet] = useState();
  const [searchValue, setSearchValue] = useState();
  const [componentLoaded, setComponentLoaded] = useState();
  const [showSidebar, setShowSidebar] = useState();

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLocationState = () => {
      if (location.state) {
        setExternalFacet(location.state.facet);
        setSearchValue(location.state.searchValue);
      }
    };

    loadDataLayer({ pageTitle: ROUTES.SEARCH.title });
    handleLocationState();
    setComponentLoaded(true);
  }, [location]);

  const handleDisplaySidebarClick = (e) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  const onValueChange = (value) => {
    console.log("\nvalue", value);
    dispatch(() => searchValueChange(value));
  };

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  const renderItem = (res) => {
    let item = {
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name,
    };

    return <PhotoBox key={item.id} item={item} />;
  };

  const allFilters = [
    GLOBAL_SEARCH_BAR_COMPONENT_ID,
    ...reactiveSearchFacets.map((f) => f.value),
  ];

  return (
    <>
      {componentLoaded && (
        <FacetsSidebar
          facets={reactiveSearchFacets}
          externalFacet={externalFacet}
          filters={allFilters}
          searchValue={searchValue}
          showSidebar={showSidebar}
        />
      )}

      <main
        id="main-content"
        className={`content ${!showSidebar ? "extended" : ""}`}
        tabIndex="-1"
      >
        <Breadcrumbs items={breadcrumbs} />

        <h2>Search Results</h2>

        <DataSearch
          autosuggest={false}
          className="datasearch web-form"
          customQuery={simpleQueryStringQuery}
          componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
          dataField={"title.primary.keyword"}
          debounce={1000}
          filterLabel="Search"
          innerClass={{
            input: "searchbox rs-search-input",
            list: "suggestionlist",
          }}
          queryFormat="or"
          placeholder={DATASEARCH_PLACEHOLDER}
          URLParams={true}
          searchOperators={true}
          onValueChange={onValueChange}
        />

        <SelectedFilters className="rs-selected-filters" />

        <FiltersShowHideButton
          showSidebar={showSidebar}
          handleToggleFiltersClick={handleDisplaySidebarClick}
        />

        <ReactiveList
          componentId="results"
          dataField="title.primary.keyword"
          innerClass={{
            list: "rs-result-list photo-grid four-grid",
            pagination: "rs-pagination",
            resultsInfo: "rs-results-info",
          }}
          defaultQuery={imagesOnlyDefaultQuery}
          loader={<LoadingSpinner loading={true} />}
          renderItem={renderItem}
          pagination={true}
          paginationAt="bottom"
          pages={10}
          react={{
            and: allFilters,
          }}
          size={24}
          URLParams={true}
        />
      </main>
    </>
  );
};

Search.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

export default Search;
