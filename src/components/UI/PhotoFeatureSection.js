import React from "react";
import PhotoFeature from "./PhotoFeature";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const PhotoFeatureSection = ({
  items,
  itemsPerRow,
  headline,
  subhead,
  linkTo,
  linkToText,
  hideDescriptions,
  ...additionalProps
}) => {
  const chunkedItems = _.chunk(items, itemsPerRow);
  return (
    <div className="section-top contain-1120" {...additionalProps}>
      <div className="section">
        <h3 data-testid="headline-photo-feature-section">{headline}</h3>
        <p className="subhead">{subhead}</p>
        {linkToText && (
          <p>
            <Link data-testid="link-photo-feature-section" to={linkTo}>
              {linkToText}
            </Link>
          </p>
        )}
      </div>
      {chunkedItems.map((chunkedItem, index) => (
        <div className="photo-feature-3-across" key={index}>
          {chunkedItem.map(item => (
            <PhotoFeature key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

PhotoFeatureSection.propTypes = {
  items: PropTypes.array,
  itemsPerRow: PropTypes.number
};

export default PhotoFeatureSection;
