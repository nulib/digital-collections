import React from 'react';
import PropTypes from 'prop-types';
import { calculatedLink } from './LineEntryHelper.js';

const LineEntry = props => {
  const { title, labels, urls } = props;

  if (labels && urls) {
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
  } else if (labels) {
    return (
      <div>
        <h4>{title}</h4>
        <p>{labels[0]}</p>
      </div>
    );
  } else {
    return null;
  }
};

LineEntry.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array,
  urls: PropTypes.array
};

export default LineEntry;
