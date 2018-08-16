import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function imagePath(item) {
  const imgUrl =
    item._source.model.name === 'Collection'
      ? item._source.thumbnail_iiif_url
      : item._source.representative_file_url;
  return `${imgUrl}/full/250,/0/default.jpg`;
}

export function linkPath(item) {
  const linkPath =
    item._source.model.name === 'Collection' ? 'collections' : 'items';
  return `/${linkPath}/${item._id}`;
}

function PhotoBox(props) {
  const { item } = props;

  return (
    <article aria-labelledby="grid1" className="photo-box">
      <a>
        <img alt={item._source.title.primary[0]} src={imagePath(item)} />
      </a>
      <h4 id="grid1">
        <Link to={linkPath(item)}>{item._source.title.primary[0]}</Link>
      </h4>
    </article>
  );
}

PhotoBox.propTypes = {
  item: PropTypes.object.isRequired
};

export default PhotoBox;
