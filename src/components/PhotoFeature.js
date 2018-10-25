import React from 'react';
import PropTypes from 'prop-types';

const PhotoFeature = props => {
  let { description, imageUrl, label } = props.item;
  return (
    <article className="photo-feature">
      <a href="#">
        <div className="front">
          <img alt="image description" src={imageUrl} />
          <div className="text-over-image">
            <h4>{label}</h4>
            <p className="link">Learn more</p>
          </div>
        </div>
        <div className="back">
          <div className="back-text">
            <h4>{label}</h4>
            <p>{description}</p>
            <p className="link">Go to Site</p>
          </div>
        </div>
      </a>
    </article>
  );
};

PhotoFeature.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    label: PropTypes.string
  })
};

export default PhotoFeature;
