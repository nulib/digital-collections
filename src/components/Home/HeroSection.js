import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeroSection = props => {
  const { collectionId, title, subTitle, heroImage } = props.heroData;
  const bgImage = require(`../../images/${heroImage}`);
  const buttonText = 'View Collection';
  const styles = {
    heroBg: {
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };

  return (
    <div className="section hero mobile-hero no-bottom-margin contain-1440">
      <div className="hero-image" style={styles.heroBg}>
        <div className="contain-1120">
          <h2>{title}</h2>
          <p>{subTitle}</p>
          <Link
            to={`/collections/${collectionId}`}
            className="button"
            aria-label="enter descriptive text"
          >
            {buttonText}
          </Link>
        </div>
      </div>
      <div className="mobile-hero-text">
        <h2>{title}</h2>
        <p>{subTitle}</p>
        <Link
          to={`/collections/${collectionId}`}
          className="button"
          aria-label="enter descriptive text"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  heroData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    heroImage: PropTypes.string.isRequired
  })
};

export default HeroSection;
