import React from 'react';

const SearchResults = () => {
  return (
    <main id="main-content" className="content" tabIndex="-1">
      <ul id="breadcrumbs">
        <li>
          <a href="search.html">Search</a>
        </li>
        <li className="active">Browsing All Items</li>
      </ul>
      <h4>729,730 results found</h4>
      <div className="sort-wrapper">
        Sort by:
        <span>
          Title <i className="fa fa-angle-down" />
        </span>
        <span>
          Date created <i className="fa fa-angle-up" />
        </span>
        <span>
          Date digitized <i className="fa fa-angle-down" />
        </span>
        <span>
          Sequence <i className="fa fa-angle-down" />
        </span>
      </div>

      <div className="section">
        <div className="photo-grid three-grid">
          <article className="photo-box" aria-labelledby="grid1">
            <a href="item.html">
              <img
                src="https://common.northwestern.edu/v8/css/images/female-no-image.jpg"
                alt="enter descriptive text"
              />
            </a>
            <h4 id="grid1">
              <a href="#">Kathy Peterson</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid2">
            <a href="item.html">
              <img
                src="https://common.northwestern.edu/v8/css/images/male-no-image.jpg"
                alt="enter descriptive text"
              />
            </a>
            <h4 id="grid2">
              <a href="#">Steve Baker</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid3">
            <a href="item.html">
              <img src="images/265x265.png" alt="enter descriptive text" />
            </a>
            <h4 id="grid3">
              <a href="#">Ann Collins</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid4">
            <a href="item.html">
              <img src="images/265x265.png" alt="enter descriptive text" />
            </a>
            <h4 id="grid4">
              <a href="#">Kimberly Powell</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid5">
            <a href="item.html">
              <img src="images/265x265.png" alt="enter descriptive text" />
            </a>
            <h4 id="grid5">
              <a href="#">Phillip Roberts</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid6">
            <a href="item.html">
              <img src="images/265x265.png" alt="enter descriptive text" />
            </a>
            <h4 id="grid6">
              <a href="#">Julie Coleman</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid7">
            <a href="item.html">
              <img src="images/265x265.png" alt="enter descriptive text" />
            </a>
            <h4 id="grid7">
              <a href="#">Fred Walker</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
          <article className="photo-box" aria-labelledby="grid8">
            <a href="item.html">
              <img src="images/265x265.png" alt="enter descriptive text" />
            </a>
            <h4 id="grid8">
              <a href="#">Angela Ramirez</a>
            </h4>
            <p>
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero
            </p>
          </article>
        </div>
      </div>
    </main>
  );
};

export default SearchResults;
