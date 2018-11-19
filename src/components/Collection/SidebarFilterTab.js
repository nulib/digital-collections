import React from 'react';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';
import YearSlider from '../reactive-search-wrappers/YearSlider';
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  imageFacets,
  imageFilters
} from '../../services/reactive-search';
import RSMultiList from '../reactive-search-wrappers/RSMultiList';

const SidebarFilterTab = props => {
  const allFilters = [
    COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
    ...imageFilters
  ];

  return (
    <div className="collapsible-no-side-margins">
      <div className="expander expander1">
        {imageFacets.map(facet => {
          return (
            <Collapsible
              trigger={<CollapsibleHeader label={facet.name} />}
              open={true}
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
  );
};

export default SidebarFilterTab;
