import React from 'react';
import { Link } from 'react-router-dom';
import { getESTitle } from '../../services/elasticsearch-parser';
import PropTypes from 'prop-types';

const NavCollectionList = props => {
  const { collections } = props;

  return (
    <React.Fragment>
      {collections &&
        collections.map(collection => (
          <li key={collection._id}>
            <Link to={`/collections/${collection._id}`}>
              {getESTitle(collection._source)}
            </Link>
          </li>
        ))}
    </React.Fragment>
  );
};

NavCollectionList.propTypes = {
  collections: PropTypes.array
};

export default NavCollectionList;
