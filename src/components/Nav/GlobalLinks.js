import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';

const GlobalLinks = props => {
  return (
    <React.Fragment>
      <li>
        <Link to="/">library.northwestern.edu</Link>
      </li>
      <Login />
    </React.Fragment>
  );
};

export default GlobalLinks;
