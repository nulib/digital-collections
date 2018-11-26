import React from 'react';
import { MultiList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

// Css class name helper
const multiListInnerClass = {
  title: 'rs-facet-title',
  list: 'rs-facet-list',
  label: 'rs-facet-label'
};

const RSMultiList = props => {
  const { allFilters, defaultVal = [], facet, title } = props;

  return (
    <MultiList
      componentId={facet.name.replace(/\s+/g, '')}
      dataField={facet.field}
      defaultSelected={defaultVal}
      innerClass={multiListInnerClass}
      missingLabel="None"
      react={{
        and: allFilters.filter(entry => {
          return entry !== facet.name.replace(/\s+/g, '');
        })
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
