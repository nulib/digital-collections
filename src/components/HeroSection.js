import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import aliceImage from '../images/alice-at-the-greek-1440x600.png';

class HeroSection extends Component {
  render() {
    const heroStyle = {
      backgroundImage: 'url(' + aliceImage + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return (
      <section className="hero contain-1440">
        <div className="hero-image" style={heroStyle}>
            <div className="contain-1120">
                <h2>Berkeley Folk Music Festival Archive</h2>
                <p>View features from this popular festival between 1957 to 1970</p>
                <Link to="/item" className="button">View this Awesome Digital Collections Set</Link>
            </div>
        </div>
      </section>
    );
  }
}

export default HeroSection;
