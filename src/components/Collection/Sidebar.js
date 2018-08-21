import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

const Sidebar = props => {
  const { item } = props;

  return (
    <div id="sidebar" className="left-sidebar content" tabIndex="-1">
      <div className="box">
        <div id="tab-container">
          <Tabs selectedTabClassName="active" id="tab-container">
            <TabList id="tabs" role="tablist">
              <Tab>About</Tab>
              <Tab>Filters</Tab>
            </TabList>

            <div id="tab-content">
              {/* About tab */}
              <TabPanel>
                <h3>Collection Description</h3>
                <p>{item.description}</p>
                <h4>Dates / Origin</h4>
                <ul>
                  <li>
                    <Link to="/">Date Created:</Link>
                  </li>
                  <li>
                    <Link to="/">Circa 1916 (Approximate)</Link>
                  </li>
                </ul>
                <h4>Library Locations</h4>
                <ul>
                  <li>Northwestern University Transportation Library</li>
                </ul>
                <h4>Subjects</h4>
                <ul>
                  <li>
                    <Link to="/">Wilmo Company</Link>
                  </li>
                  <li>
                    <Link to="/">Automobiles</Link>
                  </li>
                  <li>
                    <Link to="/">Parts</Link>
                  </li>
                  <li>
                    <Link to="/">Commercial catalogs</Link>
                  </li>
                  <li>
                    <Link to="/">Automobile factories</Link>
                  </li>
                </ul>
                <h4>Work Types</h4>
                <ul>
                  <li>
                    <Link to="/">Photographs</Link>
                  </li>
                </ul>
              </TabPanel>

              {/* Filter */}
              <TabPanel>
                <div className="web-form">
                  <div className="search-bar-wrapper">
                    <input type="text" placeholder="Search this collection" />
                    <span
                      id="sidebar-search-icon"
                      className="fa fa-search sidebar-search-icon"
                    />
                  </div>
                </div>

                <div
                  className="expander expander1"
                  data-collapse="data-collapse"
                >
                  <h3 className="open">Topic</h3>
                  <ul className="facet-list no-style">
                    <li className="active">
                      <span className="close fa fa-close" /> Active filtered
                      topic (won't display below)
                    </li>
                    <li>
                      <Link to="/">
                        Public figures <span className="count">104</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Sculptures <span className="count">42</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Homes and haunts <span className="count">119</span>
                      </Link>
                    </li>
                  </ul>

                  <h3>Name</h3>
                  <ul className="facet-list no-style">
                    <li>
                      <Link to="/">
                        Napoleon I, Emperor of the French, 1769-1821
                        <span className="count">632</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Franklin, Benjamin, 1706-1790
                        <span className="count">13</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Grant, Ulysses S. (Ulysses Simpson), 1822-1885
                        <span className="count">87</span>
                      </Link>
                    </li>
                  </ul>
                  <h3>Collection</h3>
                  <ul className="facet-list no-style">
                    <li className="active">
                      <span className="close fa fa-close" /> This current
                      collection
                    </li>
                    <li>
                      <Link to="/">Print Collection portrait file</Link>
                    </li>
                  </ul>
                  <h3>Place</h3>
                  <ul className="facet-list no-style">
                    <li>
                      <Link to="/">
                        New York City
                        <span className="count">100</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Italy
                        <span className="count">13</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        St. Helena
                        <span className="count">276</span>
                      </Link>
                    </li>
                  </ul>
                  <h3>Genre</h3>
                  <ul className="facet-list no-style">
                    <li>
                      <Link to="/">
                        Still image
                        <span className="count">341</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        Portrait
                        <span className="count">23</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  item: PropTypes.object
};

export default Sidebar;
