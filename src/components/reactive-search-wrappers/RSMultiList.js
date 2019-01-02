import React from 'react';
import { MultiList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { COLLECTION_DATA_CONTROLLER_ID } from '../../services/reactive-search';

// Css class name helper
const multiListInnerClass = {
  title: 'rs-facet-title',
  list: 'rs-facet-list',
  label: 'rs-facet-label'
};

const RSMultiList = props => {
  const { allFilters, defaultVal = [], facet, title } = props;
  const facetNameNoSpaces = facet.name.replace(/\s+/g, '');
  const filterList = allFilters.filter(entry => {
    return entry !== facetNameNoSpaces;
  });

  return (
    <MultiList
      componentId={facetNameNoSpaces}
      dataField={facet.field}
      defaultSelected={defaultVal}
      innerClass={multiListInnerClass}
      missingLabel="None"
      react={{
        and: [COLLECTION_DATA_CONTROLLER_ID, ...filterList]
      }}
      showCheckbox={false}
      showMissing={true}
      showSearch={false}
      title={title}
      URLParams={true}
    />
  );
};

RSMultiList.propTypes = {
  allFilters: PropTypes.array,
  defaultVal: PropTypes.array,
  facet: PropTypes.object,
  title: PropTypes.string
};

export default RSMultiList;
