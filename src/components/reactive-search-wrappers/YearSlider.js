import React from 'react';
import { DynamicRangeSlider } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

const YearSlider = props => {
  const title = typeof props.title === undefined ? 'Date' : '';

  return (
    <DynamicRangeSlider
      className="rs-facet-title"
      componentId="Date"
      dataField="year"
      title={title}
      showHistogram={true}
      showFilter={true}
      stepValue={10}
    />
  );
};

YearSlider.propTypes = {
  title: PropTypes.string
};

export default YearSlider;
