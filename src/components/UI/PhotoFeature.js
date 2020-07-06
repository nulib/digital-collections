import React, { useState } from "react";
import PropTypes from "prop-types";

const PhotoFeature = props => {
  let { id, description, imageUrl, label } = props.item;
  const [isHover, setIsHover] = useState(false);
  const addHoverClass = () => setIsHover(!isHover);

  return (
    <article
      className="photo-feature"
      onMouseEnter={addHoverClass}
      onMouseLeave={addHoverClass}
      aria-labelledby="photo-grid"
      data-testid="photo-feature"
    >
      <a href={`/items/${id}`}>
        <div className={!isHover ? "front-show" : "front-hide"}>
          <img alt="image description" src={imageUrl} />
          <div className="text-over-image" data-testid="front-photo-box">
            <h4>{label}</h4>
            <p className="link">Learn more</p>
          </div>
        </div>
        <div className={isHover ? "back-show" : "back-hide"}>
          <div className="back-text" data-testid="back-photo-box">
            <h4>{label}</h4>
            <p>{description.substr(0, 200)}...</p>
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
