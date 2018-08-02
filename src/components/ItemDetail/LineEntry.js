import React from 'react';
import PropTypes from 'prop-types';
import { calculatedLink } from './LineEntryHelper.js';

const LineEntry = props => {
  const { title, labels, urls } = props;

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {labels.map((label, i) => {
          return calculatedLink(label, i, urls);
        })}
      </ul>
    </div>
  );
};

LineEntry.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  urls: PropTypes.array
};

export default LineEntry;
