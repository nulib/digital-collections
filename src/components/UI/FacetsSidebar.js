import React from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "services/global-vars";
import {
  imagesOnlyDefaultQuery,
  collectionDefaultQuery,
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  FACET_SENSORS,
  FACET_SENSORS_ADMINISTRATIVE,
  FACET_SENSORS_CREATOR,
  FACET_SENSORS_DESCRIPTIVE,
} from "services/reactive-search";
import { MultiList } from "@appbaseio/reactivesearch";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
const facetHeader = css`
  margin-top: 40px;
`;

// Css class name helper
const multiListInnerClass = {
  title: "rs-facet-title",
  list: "rs-facet-list",
  label: "rs-facet-label",
  icon: "rs-facet-icon",
  checkbox: "rs-facet-checkbox",
};

const FacetsSidebar = ({
  externalFacet,
  searchBarComponentId,
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
  let facetSensorsCreator = FACET_SENSORS_CREATOR.map(
    (sensor) => sensor.componentId
  );

  // If we're on a Collection page, remove Collection from displayed facets
  if (searchBarComponentId === COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID) {
    facetSensorsCreator = facetSensorsCreator.filter(
      (facet) => facet.componentId !== "Collection"
    );
  }

  const facetSensorsDescriptive = FACET_SENSORS_DESCRIPTIVE.map(
    (sensor) => sensor.componentId
  );
  const facetSensorsAdministrative = FACET_SENSORS_ADMINISTRATIVE.map(
    (sensor) => sensor.componentId
  );

  const filterList2 = (filterId, facetGroup) => {
    let allFilters, filtersMinusCurrent;

    switch (facetGroup) {
      case "ADMINISTRATIVE":
        filtersMinusCurrent = facetSensorsAdministrative.filter(
          (filterItem) => filterItem !== filterId
        );
        allFilters = [
          ...filtersMinusCurrent,
          ...facetSensors,
          ...facetSensorsCreator,
          ...facetSensorsDescriptive,
        ];
        break;
      case "CREATOR":
        filtersMinusCurrent = facetSensorsCreator.filter(
          (filterItem) => filterItem !== filterId
        );
        allFilters = [
          ...filtersMinusCurrent,
          ...facetSensors,
          ...facetSensorsAdministrative,
          ...facetSensorsDescriptive,
        ];
        break;
      case "DESCRIPTIVE":
        filtersMinusCurrent = facetSensorsDescriptive.filter(
          (filterItem) => filterItem !== filterId
        );
        allFilters = [
          ...filtersMinusCurrent,
          ...facetSensors,
          ...facetSensorsAdministrative,
          ...facetSensorsCreator,
        ];
        break;
      default:
        filtersMinusCurrent = facetSensors.filter(
          (filterItem) => filterItem !== filterId
        );
        allFilters = [
          ...filtersMinusCurrent,
          ...facetSensorsAdministrative,
          ...facetSensorsCreator,
          ...facetSensorsDescriptive,
        ];
        break;
    }
    return [...allFilters, searchBarComponentId];
  };

  // Return all connected facets for regular metadata
  const filterList = (filterId) => {
    let filtersMinusCurrent = facetSensors.filter(
      (filterItem) => filterItem !== filterId
    );
    return [
      ...filtersMinusCurrent,
      ...facetSensorsCreator,
      ...facetSensorsDescriptive,
      searchBarComponentId,
    ];
  };
  const filterCreatorList = (filterId) => {
    let filtersMinusCurrent = facetSensorsCreator.filter(
      (filterItem) => filterItem !== filterId
    );
    return [
      ...filtersMinusCurrent,
      ...facetSensors,
      ...facetSensorsDescriptive,
      searchBarComponentId,
    ];
  };
  const filterDescriptiveList = (filterId) => {
    let filtersMinusCurrent = facetSensorsDescriptive.filter(
      (filterItem) => filterItem !== filterId
    );
    return [
      ...filtersMinusCurrent,
      ...facetSensors,
      ...facetSensorsCreator,
      searchBarComponentId,
    ];
  };

  function getDefaultValue(sensor) {
    if (!externalFacet && !searchValue) {
      return [];
    }
    return externalFacet?.title === sensor.title ? [searchValue] : [];
  }

  const defaultMultiListProps = {
    defaultQuery: isSearchPage() ? imagesOnlyDefaultQuery : collectionsQuery,
    innerClass: multiListInnerClass,
    missingLabel: "None",
    showMissing: true,
    size: 500,
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
        {/* <h2>Filter By</h2> */}
        <h2>General Filters</h2>
        {FACET_SENSORS.map((f) => {
          return (
            <MultiList
              key={f.componentId}
              {...f}
              {...defaultMultiListProps}
              defaultValue={getDefaultValue(f)}
              react={{
                and: [...filterList2(f.componentId)],
              }}
            />
          );
        })}

        <h2 css={facetHeader}>Creator/Contributor</h2>
        {FACET_SENSORS_CREATOR.map((f) => {
          return (
            <MultiList
              key={f.componentId}
              {...f}
              {...defaultMultiListProps}
              defaultValue={getDefaultValue(f)}
              react={{
                and: [...filterList2(f.componentId, "CREATOR")],
              }}
            />
          );
        })}

        <h2 css={facetHeader}>Subjects and Descriptive</h2>
        {FACET_SENSORS_DESCRIPTIVE.map((f) => {
          return (
            <MultiList
              key={f.componentId}
              {...f}
              {...defaultMultiListProps}
              defaultValue={getDefaultValue(f)}
              react={{
                and: [...filterList2(f.componentId, "DESCRIPTIVE")],
              }}
            />
          );
        })}

        <h2 css={facetHeader}>Administrative</h2>
        {FACET_SENSORS_ADMINISTRATIVE.map((f) => {
          return (
            <MultiList
              key={f.componentId}
              {...f}
              {...defaultMultiListProps}
              defaultValue={getDefaultValue(f)}
              react={{
                and: [...filterList2(f.componentId, "ADMINISTRATIVE")],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

FacetsSidebar.propTypes = {
  externalFacet: PropTypes.object,
  searchBarComponentId: PropTypes.string,
  searchValue: PropTypes.string,
  showSidebar: PropTypes.bool,
};

export default FacetsSidebar;
