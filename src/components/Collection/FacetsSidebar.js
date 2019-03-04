import React from 'react';
import YearSlider from '../reactive-search-wrappers/YearSlider';
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  facetValues,
  imageFacets,
  imageFilters
} from '../../services/reactive-search';
import RSMultiList from '../reactive-search-wrappers/RSMultiList';

const FacetsSidebar = props => {
  const allFilters = [
    COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
    ...imageFilters
  ];
  const imageFacetsNoCollection = imageFacets.filter(
    facet => facet.name !== facetValues.COLLECTION
  );

  return (
    <div
      aria-label="section navigation menu"
      className="facets-sidebar"
      tabIndex="-1"
    >
      <h2>Filter By</h2>
      {imageFacetsNoCollection.map(facet => {
        return (
          <RSMultiList
            key={facet.name}
            facet={facet}
            title={facet.name}
            allFilters={allFilters}
          />
        );
      })}

      <YearSlider title="" />
    </div>
  );
};

export default FacetsSidebar;
