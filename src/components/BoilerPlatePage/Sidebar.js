import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <div className="box">
          <h3>Header</h3>
          <p>Content pertaining to only this box</p>
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2 has a really, really long name that wraps</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
          <h4>Optional Subhead</h4>
          <p>Some content</p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
