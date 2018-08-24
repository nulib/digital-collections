import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ListItem = props => {
  return (
    <li>
      <Link to="/">
        {props.label} <span className="count">{props.count}</span>
      </Link>
    </li>
  );
};

const SearchResultsSidebar = () => {
  return (
    <div id="sidebar" className="left-sidebar content" tabIndex="-1">
      <div className="box">
        <div id="tab-container">
          <ul id="tabs" role="tablist">
            <li role="presentation">
              <a
                aria-controls="tab-panel1"
                href="#tab-panel1"
                id="tab1"
                role="tab"
              >
                Filters
              </a>
            </li>
          </ul>
          <div id="tab-content">
            {/* Filter */}
            <div aria-labelledby="tab1" id="tab-panel1" role="tabpanel">
              <div className="expander expander1 collapsible-no-side-margins">
                <Collapsible
                  trigger={<CollapsibleHeader label="Topic" />}
                  open={true}
                >
                  <ul className="facet-list no-style">
                    <li className="active">
                      <FontAwesomeIcon icon="times" /> Active filtered topic
                      will not display below)
                    </li>
                    <ListItem label="Public Figures" count="104" />
                    <ListItem label="Sculptures" count="42" />
                    <ListItem label="Homes and haunts" count="119" />
                  </ul>
                </Collapsible>

                <Collapsible
                  trigger={<CollapsibleHeader label="Name" />}
                  open={true}
                >
                  <ul className="facet-list no-style">
                    <ListItem
                      label="Napoleon I, Emperor of the French, 1769-1821"
                      count="632"
                    />
                    <ListItem
                      label="Franklin, Benjamin, 1706-1790"
                      count="13"
                    />
                    <ListItem
                      label="Grant, Ulysses S. (Ulysses Simpson), 1822-1885"
                      count="87"
                    />
                  </ul>
                </Collapsible>

                <Collapsible
                  trigger={<CollapsibleHeader label="Collection" />}
                  open={true}
                >
                  <ul className="facet-list no-style">
                    <li className="active">
                      <FontAwesomeIcon icon="times" /> This current collection
                    </li>
                    <ListItem label="Print Collection portrait file" />
                  </ul>
                </Collapsible>

                <Collapsible
                  trigger={<CollapsibleHeader label="Place" />}
                  open={false}
                >
                  <ul className="facet-list no-style">
                    <ListItem label="New York City" count="100" />
                    <ListItem label="Italy" count="13" />
                    <ListItem label="St. Helena" count="66" />
                  </ul>
                </Collapsible>

                <Collapsible
                  trigger={<CollapsibleHeader label="Genre" />}
                  open={false}
                >
                  <ul className="facet-list no-style">
                    <ListItem label="Still image" count="48" />
                    <ListItem label="Portrait" count="4" />
                  </ul>
                </Collapsible>
              </div>

              <h4>Date Range</h4>
              <div className="web-form">
                <input
                  type="text"
                  name="date1"
                  className="input-date-range"
                  placeholder="Start"
                />
                to
                <input
                  type="text"
                  name="date1"
                  className="input-date-range"
                  placeholder="End"
                />
                <button style={{ marginTop: '10px' }} className="button">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number
};

export default SearchResultsSidebar;
