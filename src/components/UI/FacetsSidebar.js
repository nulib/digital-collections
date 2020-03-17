import React from "react";
import PropTypes from "prop-types";
import RSMultiList from "./ReactiveSearchWrappers/RSMultiList";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../../services/global-vars";
import {
  imagesOnlyDefaultQuery,
  collectionDefaultQuery
} from "../../services/reactive-search";

const FacetsSidebar = ({
  facets,
  facetValue,
  filters,
  searchValue,
  showSidebar
}) => {
  const location = useLocation();
  const params = useParams();

  const isSearchPage = () => {
    return location.pathname.indexOf(ROUTES.SEARCH.path) > -1;
  };

  const collectionsQuery = () => {
    return collectionDefaultQuery(params.id);
  };

  return (
    <div
      aria-label="section navigation menu"
      aria-hidden={!showSidebar}
      className={`facets-sidebar ${!showSidebar ? "collapsed" : ""}`}
      tabIndex="-1"
    >
      <div
        className={`facet-sidebar-content-wrapper ${
          !showSidebar ? "hidden" : ""
        }`}
      >
        <h2>Filter By</h2>
        {facets.map(facet => {
          let defaultValue =
            facetValue && facetValue === facet.label ? [searchValue] : [];

          return (
            <RSMultiList
              key={facet.value}
              allFilters={filters}
              defaultValue={defaultValue}
              defaultQuery={
                isSearchPage() ? imagesOnlyDefaultQuery : collectionsQuery
              }
              facet={facet}
              title={facet.label}
            />
          );
        })}
      </div>
    </div>
  );
};

FacetsSidebar.propTypes = {
  facets: PropTypes.array,
  facetValue: PropTypes.string,
  filters: PropTypes.array,
  searchValue: PropTypes.string,
  showSidebar: PropTypes.bool
};

export default FacetsSidebar;
