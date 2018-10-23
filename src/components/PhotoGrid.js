import React from 'react';
import PropTypes from 'prop-types';
import PhotoBox from './PhotoBox';

function PhotoGrid(props) {
  let className = 'photo-grid contain-1120';
  if (props.cols) {
    switch (props.cols) {
      case 2:
        className += ` two-grid`;
        break;
      case 3:
        className += ` three-grid`;
        break;
      case 4:
        className += ` four-grid`;
        break;
      default:
        break;
    }
  }

  return (
    <div className={className}>
      {props.items.length > 0 &&
        props.items.map(item => <PhotoBox key={item.id} item={item} />)}
    </div>
  );
}

PhotoGrid.propTypes = {
  cols: PropTypes.number,
  items: PropTypes.array
};

export default PhotoGrid;
