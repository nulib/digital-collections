import React from "react";
import PropTypes from "prop-types";
import PhotoBox from "./PhotoBox";

function PhotoGrid(props) {
  let className = "photo-grid contain-1120";
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
    <div className={className} data-testid="photo-grid">
      {props.items.length > 0 &&
        props.items.map(item => (
          <PhotoBox
            key={item.id}
            hideDescriptions={props.hideDescriptions}
            item={item}
          />
        ))}
    </div>
  );
}

PhotoGrid.propTypes = {
  cols: PropTypes.number,
  hideDescriptions: PropTypes.bool,
  items: PropTypes.array
};

export default PhotoGrid;
