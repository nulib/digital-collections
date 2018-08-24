import React from 'react';
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListItem = props => {
  return (
    <li>
      <Link to="/">
        {props.label} <span className="count">{props.count}</span>
      </Link>
    </li>
  );
};

const SidebarFilterTabContent = props => {
  return (
    <div className="collapsible-no-side-margins">
      <div className="web-form">
        <div className="search-bar-wrapper">
          <input type="text" placeholder="Search this collection" />
          <span
            id="sidebar-search-icon"
            className="fa fa-search sidebar-search-icon"
          />
        </div>
      </div>

      <div className="expander expander1">
        <Collapsible trigger={<CollapsibleHeader label="Topic" />} open={true}>
          <ul className="facet-list no-style">
            <li className="active">
              <FontAwesomeIcon icon="times" /> Active filtered topic (will not
              display below)
            </li>
            <ListItem label="Public figures" count="104" />
            <ListItem label="Sculptures" count="26" />
            <ListItem label="Whatever" count="78" />
          </ul>
        </Collapsible>

        <Collapsible trigger={<CollapsibleHeader label="Name" />} open={true}>
          <ul className="facet-list no-style">
            <ListItem
              label="Napoleon I, Emperor of the French, 1769-1821"
              count="632"
            />
            <ListItem label="Franklin, Benjamin, 1706-1790" count="13" />
            <ListItem
              label="Grant, Ulysses S. (Ulysses Simpson), 1822-1885"
              count="99"
            />
          </ul>
        </Collapsible>

        <Collapsible
          trigger={<CollapsibleHeader label="Collection" />}
          open={true}
        >
          <ul className="facet-list no-style">
            <li className="active">
              <span className="close fa fa-close" /> This current collection
            </li>
            <ListItem label="Print Collection portrait file" count="" />
          </ul>
        </Collapsible>

        <Collapsible trigger={<CollapsibleHeader label="Place" />} open={true}>
          <ul className="facet-list no-style">
            <ListItem label="New York City" count="100" />
            <ListItem label="Italy" count="13" />
            <ListItem label="St. Helena" count="66" />
          </ul>
        </Collapsible>

        <Collapsible trigger={<CollapsibleHeader label="Genre" />} open={true}>
          <ul className="facet-list no-style">
            <ListItem label="Still image" count="48" />
            <ListItem label="Portrait" count="4" />
          </ul>
        </Collapsible>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number
};

export default SidebarFilterTabContent;
