import React from 'react';

const About = props => {
  const bgImage = require(`../images/about-hero.jpg`);
  const styles = {
    heroBg: {
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  };

  return (
    <div className="standard-page narrow-page">
      <div className="section hero contain-1440">
        <div className="hero-image" style={styles.heroBg}>
          <div className="contain-1120">
            <h2>Repository and Digital Curation</h2>
            <p>What we do and why it matters</p>
          </div>
        </div>
      </div>

      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <p>
            This page type is typically used for content pages in single-page
            sections (for example a Contact Us page). The &lt;body&gt; should
            have the classes "standard-content narrow-content" to set the
            correct width for a readable line length. The hero image is
            optional.
          </p>
        </main>
      </div>
    </div>
  );
};

export default About;
