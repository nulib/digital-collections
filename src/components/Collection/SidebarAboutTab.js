import React from 'react';
import PropTypes from 'prop-types';

const SidebarAboutTab = props => {
  const { item } = props;

  return (
    <div>
      <h3>Collection Description</h3>
      <p>{item.description}</p>
      <h4>Dates / Origin</h4>
      <ul>
        <li>Circa 1916 (Approximate)</li>
      </ul>
      <h4>Library Locations</h4>
      <ul>
        <li>Northwestern University Transportation Library</li>
      </ul>
      <h4>Subjects</h4>
      <ul>
        <li>Wilmo Company</li>
        <li>Automobiles</li>
        <li>Parts</li>
        <li>Commercial catalogs</li>
        <li>Automobile factories</li>
      </ul>
      <h4>Work Types</h4>
      <ul>
        <li>Photographs</li>
      </ul>
    </div>
  );
};

SidebarAboutTab.propTypes = {
  item: PropTypes.object
};

export default SidebarAboutTab;
