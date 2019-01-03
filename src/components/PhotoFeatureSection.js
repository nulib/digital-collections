import React from 'react';
import PhotoFeature from './PhotoFeature';
import PropTypes from 'prop-types';

const PhotoFeatureSection = props => {
  let items = props.items.slice(0, 2);

  return (
    <div className="section">
      <div className="photo-feature-3-across">
        {items.map(item => (
          <PhotoFeature key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

PhotoFeatureSection.propTypes = {
  items: PropTypes.array
};

export default PhotoFeatureSection;
