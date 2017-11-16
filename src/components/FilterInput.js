import React from 'react';

function FilterInput(props) {
  return (
    <div className="field">
      <input id="search-text" name="search-text" required="required" type="text" placeholder="Search Collections"/>
    </div>
  );
}

export default FilterInput;
