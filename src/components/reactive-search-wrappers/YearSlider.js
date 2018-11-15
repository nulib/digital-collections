import React from 'react';
import { DynamicRangeSlider } from '@appbaseio/reactivesearch';

const YearSlider = props => {
  return (
    <DynamicRangeSlider
      className="rs-facet-title"
      componentId="Date"
      dataField="year"
      title="Date"
      showHistogram={true}
      showFilter={true}
      stepValue={10}
    />
  );
};

export default YearSlider;
