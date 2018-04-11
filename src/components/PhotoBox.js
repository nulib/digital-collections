import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PhotoBox(props) {
  const { item } = props;

  return (
    <article aria-labelledby="grid1" className="photo-box">
      <a>
        <img alt="Digital Collections Library" src={item.imgSource} />
      </a>
      <h4 id="grid1">
        <Link to="/">{item.title}</Link>
      </h4>
      <div className="item-count">143 Items</div>
    </article>
  );
}

PhotoBox.propTypes = {
  item: PropTypes.object.isRequired
};

export default PhotoBox;
