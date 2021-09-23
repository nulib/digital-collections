import React from "react";
import PropTypes from "prop-types";
import PhotoGrid from "./PhotoGrid";
import { Link } from "react-router-dom";

const PhotoGridSection = ({
  headline,
  items,
  linkTo,
  linkToText,
  hideDescriptions,
  ...additionalProps // Catches "data-testid" prop for unit and/or end to end tests
}) => {
  return (
    <section className="section" {...additionalProps}>
      <div className="section-top contain-970">
        <h3 data-testid="headline-photo-grid-section">{headline}</h3>
        {linkToText && (
          <p>
            <Link data-testid="link-photo-grid-section" to={linkTo}>
              {linkToText}
            </Link>
          </p>
        )}
      </div>
      <PhotoGrid items={items} hideDescriptions={hideDescriptions} />
    </section>
  );
};

PhotoGridSection.propTypes = {
  headline: PropTypes.string,
  items: PropTypes.array,
  linkTo: PropTypes.string,
  linkToText: PropTypes.string,
  hideDescriptions: PropTypes.bool,
};

export default PhotoGridSection;
