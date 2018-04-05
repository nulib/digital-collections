import React, { Component } from 'react';

class ContactUs extends Component {
  componentDidMount() {
    document.body.className = 'standard-page narrow-page';
  }

  render() {
    return (
      <section className="contain-1120">
        <h2>Contact Us</h2>
        <p>Info goes here</p>
      </section>
    );
  }
}

export default ContactUs;
