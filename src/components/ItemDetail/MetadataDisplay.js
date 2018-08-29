import React from 'react';
import PropTypes from 'prop-types';

const MetadataDisplay = props => {
  const { title, items } = props;

  let multipleItems = item => {
    if (item.label) {
      return <li key={item.label}>{item.label}</li>;
    } else {
      return <li key={item}>{item}</li>;
    }
  };

  let singleItem = item => {
    if (item.label) {
      return <p key={item.label}>{item.label}</p>;
    } else {
      return <p key={item}>{item}</p>;
    }
  };

  let display;

  if (title === 'Contributor') {
    display = items.map(item => (
      <li key={item.label}>
        <a href={`/reactivesearch?Contributor=["${item.label}"]`}>
          {item.label}
        </a>
      </li>
    ));
  } else if (typeof items === 'string') display = singleItem(items);
  else if (Array.isArray(items))
    display = items.map(item => multipleItems(item));

  if (items && items.length > 0) {
    return (
      <div>
        <h4>{title}</h4>
        <ul>{display}</ul>
      </div>
    );
  } else {
    return null;
  }
};

MetadataDisplay.propTypes = {
  title: PropTypes.string
};

export default MetadataDisplay;
