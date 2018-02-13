import React, { Component } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

class Header extends Component {
  render() {
    return (
      <header>
        <TopBar />
        <BottomBar />
      </header>
    );
  }
}

export default Header;
