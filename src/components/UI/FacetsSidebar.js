import React from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "services/global-vars";
import {
  imagesOnlyDefaultQuery,
  collectionDefaultQuery,
  FACET_SENSORS,
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
} from "services/reactive-search";
import { MultiList } from "@appbaseio/reactivesearch";

// Css class name helper
const multiListInnerClass = {
  title: "rs-facet-title",
  list: "rs-facet-list",
  label: "rs-facet-label",
  icon: "rs-facet-icon",
  checkbox: "rs-facet-checkbox",
};

const FacetsSidebar = ({
  facets,
  externalFacet,
  filters,
  searchValue,
  showSidebar,
}) => {
  const location = useLocation();
  const params = useParams();

  const isSearchPage = () => {
    return location.pathname.indexOf(ROUTES.SEARCH.path) > -1;
  };
  const collectionsQuery = () => {
    return collectionDefaultQuery(params.id);
  };

  /**
   * Organize the facetable metadata into groups
   */
  const facetSensors = FACET_SENSORS.map((sensor) => sensor.componentId);
  // const facetProjectSensors = FACET_PROJECT_SENSORS.map(
  //   (sensor) => sensor.componentId
  // );
  // const facetTechnicalMetadataSensors = FACET_TECHNICAL_METADATA_SENSORS.map(
  //   (sensor) => sensor.componentId
  // );

  // Return all connected facets for regular metadata
  const filterList = (filterId) => {
    let filtersMinusCurrent = facetSensors.filter(
      (filterItem) => filterItem !== filterId
    );
    return [...filtersMinusCurrent, GLOBAL_SEARCH_BAR_COMPONENT_ID];
  };

  return (
    <div
      data-testid="facets-sidebar"
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
        {facets.map((f) => {
          let defaultValue =
            externalFacet && externalFacet.title === f.title
              ? [searchValue]
              : [];

          return (
            <MultiList
              key={f.componentId}
              {...f}
              defaultValue={defaultValue}
              defaultQuery={
                isSearchPage() ? imagesOnlyDefaultQuery : collectionsQuery
              }
              innerClass={multiListInnerClass}
              missingLabel="None"
              react={{
                and: [...filterList(f.componentId)],
              }}
              showMissing={true}
              size={500}
            />
          );
        })}
      </div>
    </div>
  );
};

FacetsSidebar.propTypes = {
  facets: PropTypes.array,
  externalFacet: PropTypes.object,
  filters: PropTypes.array,
  searchValue: PropTypes.string,
  showSidebar: PropTypes.bool,
};

export default FacetsSidebar;
