import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeroSecondarySection = props => {
  const { title, subTitle, heroImage } = props.heroData;
  const bgImage = require(`../../images/${heroImage}`);
  const buttonText = 'See more';
  const styles = {
    heroBg: {
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };

  return (
    <div className="section hero">
      <div className="hero-image in-page" style={styles.heroBg}>
        <h3>{title}</h3>
        <p>{subTitle}</p>
        <ul className="center-list">
          <li>
            <Link className="button" to="/">
              {buttonText}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

HeroSecondarySection.propTypes = {
  heroData: PropTypes.shape({
    heroImage: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default HeroSecondarySection;
