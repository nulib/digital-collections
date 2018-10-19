import React from 'react';
import PropTypes from 'prop-types';
import PhotoBox from './PhotoBox';

function PhotoGrid(props) {
  return (
    <div className="photo-grid">
      {props.items.length > 0 &&
        props.items.map(item => <PhotoBox key={item.id} item={item} />)}
    </div>
  );
}

PhotoGrid.propTypes = {
  items: PropTypes.array
};

export default PhotoGrid;
