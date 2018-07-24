import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sort = props => {
  return (
    <div className="sort-wrapper">
      Sort by:
      <span>
        Title <FontAwesomeIcon icon="angle-down" />
      </span>
      <span>
        Date created <FontAwesomeIcon icon="angle-up" />
      </span>
      <span>
        Date digitized <FontAwesomeIcon icon="angle-down" />
      </span>
      <span>
        Sequence <FontAwesomeIcon icon="angle-down" />
      </span>
    </div>
  );
};

export default Sort;
