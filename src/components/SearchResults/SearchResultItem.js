import React from 'react';

const SearchResultItem = props => {
  return (
    <article className="photo-box" aria-labelledby="grid1">
      <a href="item.html">
        <img
          src="https://common.northwestern.edu/v8/css/images/female-no-image.jpg"
          alt="enter descriptive text"
        />
      </a>
      <h4 id="grid1">
        <a href="">Kathy Peterson</a>
      </h4>
      <p>
        Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero
      </p>
    </article>
  );
};

export default SearchResultItem;
