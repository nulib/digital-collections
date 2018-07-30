import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              <div className="expander expander1" data-collapse="data-collapse">
                <h3 className="open">Topic</h3>
                <ul className="facet-list no-style">
                  <li className="active">
                    <FontAwesomeIcon icon="times" className="close" /> Active
                    filtered topic will not display below)
                  </li>
                  <li>
                    <a href="">
                      Public figures
                      <span className="count">104</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Sculptures
                      <span className="count">42</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Homes and haunts <span className="count">119</span>
                    </a>
                  </li>
                </ul>
                <h3>Name</h3>
                <ul className="facet-list no-style">
                  <li>
                    <a href="">
                      Napoleon I, Emperor of the French, 1769-1821{' '}
                      <span className="count">632</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Franklin, Benjamin, 1706-1790{' '}
                      <span className="count">13</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Grant, Ulysses S. (Ulysses Simpson), 1822-1885{' '}
                      <span className="count">87</span>
                    </a>
                  </li>
                </ul>
                <h3>Collection</h3>
                <ul className="facet-list no-style">
                  <li className="active">
                    <FontAwesomeIcon icon="times" className="close" /> This
                    current collection
                  </li>
                  <li>
                    <a href="">Print Collection portrait file</a>
                  </li>
                </ul>
                <h3>Place</h3>
                <ul className="facet-list no-style">
                  <li>
                    <a href="">
                      New York City <span className="count">100</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Italy <span className="count">13</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      St. Helena <span className="count">276</span>
                    </a>
                  </li>
                </ul>
                <h3>Genre</h3>
                <ul className="facet-list no-style">
                  <li>
                    <a href="">
                      Still image <span className="count">341</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Portrait <span className="count">23</span>
                    </a>
                  </li>
                </ul>
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

export default SearchResultsSidebar;
