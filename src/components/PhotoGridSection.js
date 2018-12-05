import React from 'react';
import PropTypes from 'prop-types';
import PhotoGrid from './PhotoGrid';
import { Link } from 'react-router-dom';

const PhotoGridSection = props => {
  return (
    <section className="section">
      <div className="section-top contain-970">
        <h3>{props.headline}</h3>
        {props.linkToText && (
          <p>
            <Link to={props.linkTo}>{props.linkToText}</Link>
          </p>
        )}
      </div>
      <PhotoGrid
        items={props.items}
        hideDescriptions={props.hideDescriptions}
      />
    </section>
  );
};

PhotoGridSection.propTypes = {
  headline: PropTypes.string,
  items: PropTypes.array,
  linkTo: PropTypes.string,
  linkToText: PropTypes.string
};

PhotoGridSection.propTypes = {
  items: PropTypes.array,
  hideDescriptions: PropTypes.bool
};

export default PhotoGridSection;
