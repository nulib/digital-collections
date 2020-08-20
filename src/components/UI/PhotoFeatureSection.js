import React from "react";
import PhotoFeature from "./PhotoFeature";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const PhotoFeatureSection = ({
  items,
  headline,
  subhead,
  linkTo,
  linkToText,
  ...additionalProps
}) => {
  //Randomize collections array
  items.sort(() => 0.5 - Math.random());
  //Divide into chunks of 3
  let chunkedItems = _.chunk(items, 3);
  //Filter for array of 3 to go into each row
  chunkedItems = chunkedItems.filter((item) => item.length === 3);
  return (
    <section className="section" {...additionalProps}>
      <div className="section-top contain-1440" {...additionalProps}>
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
        <div
          className="photo-feature-3-across"
          key={index}
          style={{ marginTop: 0 }}
        >
          {chunkedItem.map((item) => (
            <PhotoFeature key={item.id} item={item} />
          ))}
        </div>
      ))}
    </section>
  );
};

PhotoFeatureSection.propTypes = {
  items: PropTypes.array,
  itemsPerRow: PropTypes.number,
};

export default PhotoFeatureSection;
