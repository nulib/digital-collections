import React from 'react';
import './FilterInput.css';

function FilterInput(props) {
  return (
    <div className="FilterInput field">
      <i className="fa fa-search" aria-hidden="true" />
      <input
        id="search-text"
        name="search-text"
        required="required"
        type="text"
        placeholder={`Search ${props.filterName}`}
      />
    </div>
  );
}

export default FilterInput;
