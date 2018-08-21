import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as helpers from '../services/helpers';

const PhotoBox = props => {
  const { item } = props;
  const label = item._source.title.primary[0];
  const linkPath = helpers.getLinkPath(item);

  return (
    <article aria-labelledby="grid1" className="photo-box">
      <Link to={linkPath}>
        <img alt={label} src={helpers.getImagePath(item)} />
      </Link>
      <h4>
        <Link to={linkPath}>{label}</Link>
      </h4>
    </article>
  );
};

PhotoBox.propTypes = {
  item: PropTypes.object.isRequired
};

export default PhotoBox;
