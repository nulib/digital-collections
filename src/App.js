import React, { Component } from 'react';
import Header from './Header/';
import Nav from './Nav';
import BoilerPlatePage from './BoilerPlatePage';
import Footer from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Nav />
        <BoilerPlatePage />
        <Footer />
      </div>
    );
  }
}

export default App;
