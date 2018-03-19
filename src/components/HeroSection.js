import React from 'react';
import { Link } from 'react-router-dom';
import aliceImage from '../images/alice-at-the-greek-1440x600.png';

const HeroSection = () => {
  const styles = {
    heroBg: {
      backgroundImage: 'url(' + aliceImage + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };

  return (
    <div className="section hero mobile-hero no-bottom-margin contain-1440">
      <div className="hero-image" style={styles.heroBg}>
        <div className="contain-1120">
          <h2>Berkeley Folk Festival</h2>
          <p>Summer of love - collection description here</p>
          <Link to="/" className="button" aria-label="enter descriptive text">
            View Collection
          </Link>
        </div>
      </div>
      <div className="mobile-hero-text">
        <h2>Page Title</h2>
        <p>Optional Subhead</p>
        <Link to="/" className="button" aria-label="enter descriptive text">
          Optional Button
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
