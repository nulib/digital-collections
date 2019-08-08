import React from 'react';
import Login from '../Login';

const GlobalLinks = props => {
  return (
    <React.Fragment>
      <li>
        <a
          href="https://www.library.northwestern.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          library.northwestern.edu
        </a>
      </li>
      <Login />
    </React.Fragment>
  );
};

export default GlobalLinks;
