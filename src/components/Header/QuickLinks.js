import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    label: 'About',
    url: '/about'
  },
  {
    label: 'Contact Us',
    url: '/'
  }
];

const QuickLinks = props => {
  return (
    <div id="quick-links" aria-label="quick links navigation">
      <ul>
        {links.map(link => (
          <li key={link.label}>
            <Link to={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
