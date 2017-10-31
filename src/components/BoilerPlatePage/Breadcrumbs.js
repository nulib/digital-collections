import React, {Component} from 'react';

class Breadcrumbs extends Component {
  render() {
    return (
      <ul id="breadcrumbs">
          <li><a href="#">Home</a></li>
          <li><a href="#">Page 1</a></li>
          <li className="active">Page 2</li>
      </ul>
    );
  }
}

export default Breadcrumbs;
