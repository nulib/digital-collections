import React from 'react';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';
import YearSlider from '../reactive-search-wrappers/YearSlider';
import { MultiList } from '@appbaseio/reactivesearch';
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  imageFacets,
  imageFilters
} from '../../services/reactive-search';

const SidebarFilterTab = props => {
  const allFilters = [
    COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
    ...imageFilters
  ];

  // Css class name helper
  const multiListInnerClass = {
    title: 'rs-facet-title',
    list: 'rs-facet-list',
    label: 'rs-facet-label'
  };

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
              <MultiList
                key={facet.name}
                innerClass={multiListInnerClass}
                componentId={facet.name.replace(/\s+/g, '')}
                dataField={facet.field}
                title=""
                showCheckbox={false}
                showMissing={true}
                showSearch={false}
                URLParams={true}
                react={{
                  and: allFilters.filter(entry => {
                    return entry !== facet.name.replace(/\s+/g, '');
                  })
                }}
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
  );
};

export default SidebarFilterTab;
