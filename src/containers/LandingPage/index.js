import React, {Component} from 'react';
import HeroSection from '../../components/HeroSection';
import './LandingPage.css';

class LandingPage extends Component {

  componentDidMount() {
    document.body.className="landing-page";
  }

  render() {
    return (
      <div>
        <HeroSection />
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <section>
              <div className="section-top contain-970">
                <h3>Explore Institutional Collections</h3>
                <p><a href="#">View All Collections</a></p>
                <p>Northwestern's Institutional Collections are a wide-ranging collection spanning cultures from .... more text goes here?</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default LandingPage;
