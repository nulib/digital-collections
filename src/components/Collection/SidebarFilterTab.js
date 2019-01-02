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
import { getESTitle } from '../../services/elasticsearch-parser';

const SidebarFilterTab = props => {
  const allFilters = [
    COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
    ...imageFilters
  ];
  const title = getESTitle(props.collection);

  return (
    <React.Fragment>
      <div className="collapsible-no-side-margins">
        <div className="expander expander1">
          {imageFacets.map(facet => {
            return (
              <Collapsible
                trigger={<CollapsibleHeader label={facet.name} />}
                open={true}
                key={facet.name}
              >
                <RSMultiList
                  facet={facet}
                  title=""
                  allFilters={allFilters}
                  // Send in Collection title as default applied filter
                  defaultVal={
                    facet.name === facetValues.COLLECTION ? [title] : []
                  }
                />
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
