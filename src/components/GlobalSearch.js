import React from 'react';

const GlobalSearch = () => {
  const styles = {
    section: {
      display: 'block'
    }
  };

  return (
    <section
      className="contain-1440 home-search"
      id="library-search-dropdown"
      style={styles.section}
    >
      <div className="contain-1120">
        <div className="section-top">
          <p className="subhead">
            Explore 729,730 items digitized from Northwestern's digital
            collections.
          </p>
        </div>
        <div className="for-column">
          <span>for</span>
          <input
            className="searchbox"
            maxLength="256"
            name="query"
            placeholder="Ex: Cleopatra"
            size="20"
            title="search"
            type="text"
            value=""
          />
          <button type="submit">
            <span className="hide-label">Search</span>
          </button>
          <div className="advanced-search">
            <a>Advanced Search</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalSearch;
