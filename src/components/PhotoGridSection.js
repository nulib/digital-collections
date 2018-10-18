import React from 'react';
import PropTypes from 'prop-types';
import PhotoBox from './PhotoBox';
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
      <div className="photo-grid contain-1120">
        {props.items.length > 0 &&
          props.items.map(item => <PhotoBox key={item.id} item={item} />)}
      </div>
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
