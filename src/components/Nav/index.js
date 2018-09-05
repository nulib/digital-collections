import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchToggle } from '../../actions/search';

const styles = {
  searchButton: {
    cursor: 'pointer'
  }
};

const Nav = props => {
  const handleSearchIconClick = e => {
    // Send redux action that Global Search is open or close
    props.searchToggle();
  };

  return (
    <nav id="top-nav" aria-label="main navigation menu">
      <div className="contain-1120">
        <ul>
          <li>
            <Link to="/about">About Digital Collections</Link>
          </li>
          <li>
            <Link to="/">
              Browse
              <span className="dropdown-arrow" />
            </Link>
            <ul className="dropdown" aria-label="navigation submenu">
              <li>
                <ul>
                  <li>
                    <Link to="/">Subject</Link>
                  </li>
                  <li>
                    <Link to="/">Worktype</Link>
                  </li>
                  <li>
                    <Link to="/">Creator</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">
              Collection Types
              <span className="dropdown-arrow" />
            </Link>
            <ul className="dropdown" aria-label="navigation submenu">
              <li className="nav-intro">
                <p className="intro">Header</p>
                <Link
                  to="/"
                  className="button"
                  aria-label="enter descriptive text"
                >
                  Optional Button
                </Link>
              </li>
              <li className="nav-links">
                <ul>
                  <li>
                    <Link to="/">Link 1</Link>
                  </li>
                  <li>
                    <Link to="/">Link 2</Link>
                  </li>
                  <li>
                    <Link to="/">Link 3</Link>
                  </li>
                  <li>
                    <Link to="/">Link 4</Link>
                  </li>
                  <li>
                    <Link to="/">Link 5</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li id="library-search-button">
            <a style={styles.searchButton} onClick={handleSearchIconClick}>
              &nbsp;
              <span className="hide-label">Click to open search menu</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapDispatchToProps = dispatch => ({
  searchToggle: () => dispatch(searchToggle())
});

export default connect(
  null,
  mapDispatchToProps
)(Nav);
