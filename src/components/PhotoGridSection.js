import React from 'react';
import PropTypes from 'prop-types';
import PhotoGrid from './PhotoGrid';
import { Link } from 'react-router-dom';

const PhotoGridSection = props => {
  return (
    <section>
      <div className="section-top contain-970">
        <h3>{props.headline}</h3>
        <p>
          <Link to="/">{props.linkToText}</Link>
        </p>
      </div>
      <PhotoGrid items={props.items} />
    </section>
  );
};

PhotoGridSection.propTypes = {
  headline: PropTypes.string,
  items: PropTypes.array,
  linkTo: PropTypes.string,
  linkToText: PropTypes.string
};

export default PhotoGridSection;
