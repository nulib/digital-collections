import React from 'react';
import { Link } from 'react-router-dom';

const HeroSecondarySection = props => {
  const { title, subTitle, imageUrl } = props.heroData;
  const buttonText = 'See more';
  const styles = {
    heroBg: {
      backgroundImage: `url(${imageUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };

  return (
    <section className="standard-page">
      <div className="section-top contain-1120">
        <div className="section background-select">
          <div className="background-select-image" style={styles.heroBg}>
            <div className="contain-780">
              <h3 className="background-select-header">{title}</h3>
              <p className="select-date">{subTitle}</p>
              <p />
              <Link
                to="/"
                aria-label="enter descriptive text"
                className="button"
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSecondarySection;
