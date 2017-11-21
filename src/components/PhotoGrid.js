import React from 'react';
import PhotoBox from './PhotoBox';
import './PhotoGrid.css';

function PhotoGrid(props) {
  const classes = 'photo-grid ' + props.additionalClasses;

  return (
    <div className={classes}>
      {props.items.map((item) => (
        <PhotoBox
          key={item.id}
          item={item}
          linkPath={`${props.linkPrefix}/${item.id}`}
          />
      ))}
    </div>
  );
}

export default PhotoGrid;
