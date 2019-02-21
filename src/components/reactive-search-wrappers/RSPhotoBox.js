import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RSPhotoBox = props => {
  const { item } = props;

  const styles = {
    article: {
      cursor: 'pointer'
    }
  };

  // This is a workaround way to get accurate 'back' button browser functionality
  // For some reason since we're using multiple ReactiveSearch MultiList components
  // in our search results pages, ReactiveSearch is rendering multiple history entries
  // that are difficult to work around.
  const handlePhotoboxClick = id => {
    //window.location = `/items/${id}`;
  };

  return (
    <article
      aria-labelledby="grid1"
      className="photo-box"
      onClick={() => handlePhotoboxClick(item.id)}
      key={item.id}
      style={styles.article}
    >
      <Link to="/about">
        <img alt={item.label} src={item.imageUrl} />
      </Link>
      <h4>
        {/* eslint-disable-next-line */}
        <a>{item.label}</a>
      </h4>
    </article>
  );
};

RSPhotoBox.propTypes = {
  item: PropTypes.object.isRequired
};

export default RSPhotoBox;
