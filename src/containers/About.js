import React, { Component } from 'react';

class About extends Component {
  componentDidMount() {
    document.body.className = 'standard-page narrow-page';
  }

  render() {
    return (
      <div className="standard-page">
        <div id="page" className="full-width">
          <main id="main-content" className="content" tabIndex="0">
            <section className="contain-1120">
              <h2>About</h2>
              <p>Info goes here</p>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default About;
