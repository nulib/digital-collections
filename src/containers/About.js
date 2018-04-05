import React, { Component } from 'react';

class About extends Component {
  componentDidMount() {
    document.body.className = 'standard-page narrow-page';
  }

  render() {
    return (
      <section className="contain-1120">
        <h2>About</h2>
        <p>Info goes here</p>
      </section>
    );
  }
}

export default About;
