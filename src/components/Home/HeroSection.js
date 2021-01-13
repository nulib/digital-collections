import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HeroSection = (props) => {
  const { collectionId, title, subTitle, heroImage } = props.heroData;
  const bgImage = require(`../../images/${heroImage}`);
  const buttonText = "View Collection";
  const styles = {
    heroBg: {
      backgroundImage: `url(${bgImage.default})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <div
      className="section hero mobile-hero no-bottom-margin contain-1440"
      data-testid="hero-home"
    >
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
        <h2 data-testid="hero-title">{title}</h2>
        <p data-testid="hero-subtitle">{subTitle}</p>
        <Link
          to={`/collections/${collectionId}`}
          className="button"
          aria-label="enter descriptive text"
          data-testid="hero-button-link"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  heroData: PropTypes.shape({
    collectionId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    heroImage: PropTypes.string.isRequired,
  }),
};

export default HeroSection;
