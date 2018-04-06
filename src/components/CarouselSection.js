import React from 'react';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CarouselSection = props => {
  const { sectionTitle, linkTo, items = [], slidesPerView } = props;
  const link = `/${linkTo}`;

  return (
    <div>
      <h4>
        {sectionTitle}
        <Link to={link} className="see-more-link">
          <small>See More</small>
        </Link>
      </h4>
      <Carousel items={items} slidesPerView={slidesPerView} />
    </div>
  );
};

CarouselSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  items: PropTypes.array,
  slidesPerView: PropTypes.number.isRequired
};

export default CarouselSection;
