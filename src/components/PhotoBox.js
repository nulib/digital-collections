import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import placeholderImage from '../images/book_placeholder.jpg';

export function imagePath(item) {
  const imgUrl =
    item._source.model.name === 'Collection'
      ? item._source.thumbnail_iiif_url
      : item._source.representative_file_url;

  const returnUrl =
    imgUrl === '' ? placeholderImage : `${imgUrl}/full/250,/0/default.jpg`;

  return returnUrl;
}

export function linkPath(item) {
  const linkPath =
    item._source.model.name === 'Collection' ? 'collections' : 'items';
  return `/${linkPath}/${item._id}`;
}

function PhotoBox(props) {
  const { item } = props;
  const styles = {
    linkWrapper: {
      cursor: 'pointer'
    },
    title: {
      display: 'inline-block',
      marginTop: '12px'
    }
  };

  return (
    <article aria-labelledby="grid1" className="photo-box">
      <Link to={linkPath(item)} style={styles.linkWrapper}>
        <img
          alt={item._source.title.primary[0]}
          src={imagePath(item)}
          style={styles.image}
        />
        <span style={styles.title}>{item._source.title.primary[0]}</span>
      </Link>
    </article>
  );
}

PhotoBox.propTypes = {
  item: PropTypes.object.isRequired
};

export default PhotoBox;
