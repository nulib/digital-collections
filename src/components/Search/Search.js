import React, { useState, useEffect } from "react";
import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import {
  DATASEARCH_PLACEHOLDER,
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  simpleQueryStringQuery,
} from "services/reactive-search";
import { useLocation } from "react-router-dom";
import FacetsSidebar from "../UI/FacetsSidebar";
import Breadcrumbs from "../UI/Breadcrumbs/Breadcrumbs";
import FiltersShowHideButton from "../UI/FiltersShowHideButton";
import { useDispatch } from "react-redux";
import { searchValueChange } from "actions/search";
import PropTypes from "prop-types";
import WrappedReactiveList from "./WrappedReactiveList";

const Search = ({ breadcrumbs = [] }) => {
  const [externalFacet, setExternalFacet] = useState();
  const [searchValue, setSearchValue] = useState();
  const [componentLoaded, setComponentLoaded] = useState();
  const [showSidebar, setShowSidebar] = useState();

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location) return;
    const handleLocationState = () => {
      if (location.state) {
        setExternalFacet(location.state.facet);
        setSearchValue(location.state.searchValue);
      }
    };

    handleLocationState();
    setComponentLoaded(true);
  }, [location]);

  const handleDisplaySidebarClick = (e) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
  };

  const onValueChange = (value) => {
    dispatch(() => searchValueChange(value));
  };

  return (
    <>
      {componentLoaded && (
        <FacetsSidebar
          externalFacet={externalFacet}
          searchBarComponentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
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
          dataField={["full_text"]}
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

        <WrappedReactiveList />
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
