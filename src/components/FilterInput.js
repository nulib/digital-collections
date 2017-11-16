import React from 'react';

function FilterInput(props) {
  return (
    <div className="field">
      <input id="search-text" name="search-text" required="required" type="text" placeholder={`Search ${props.filterName}`}/>
    </div>
  );
}

export default FilterInput;
