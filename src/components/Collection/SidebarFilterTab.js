import React from 'react';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';
import YearSlider from '../reactive-search-wrappers/YearSlider';
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  facetValues,
  imageFacets,
  imageFilters
} from '../../services/reactive-search';
import RSMultiList from '../reactive-search-wrappers/RSMultiList';
import PropTypes from 'prop-types';

const SidebarFilterTab = props => {
  const allFilters = [
    COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
    ...imageFilters
  ];
  const imageFacetsNoCollection = imageFacets.filter(
    facet => facet.name !== facetValues.COLLECTION
  );

  return (
    <React.Fragment>
      <div className="collapsible-no-side-margins">
        <div className="expander expander1">
          {imageFacetsNoCollection.map(facet => {
            return (
              <Collapsible
                trigger={<CollapsibleHeader label={facet.name} />}
                open={false}
                key={facet.name}
              >
                <RSMultiList facet={facet} title="" allFilters={allFilters} />
              </Collapsible>
            );
          })}
          <Collapsible
            trigger={<CollapsibleHeader label="Date" />}
            open={true}
            key="Date"
          >
            <YearSlider title="" />
          </Collapsible>
        </div>
      </div>
    </React.Fragment>
  );
};

SidebarFilterTab.propTypes = {
  collection: PropTypes.object
};

export default SidebarFilterTab;
