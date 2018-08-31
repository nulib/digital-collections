import React from 'react';
import PropTypes from 'prop-types';

const MetadataDisplay = props => {
  const { title, items, facet_value = '' } = props;

  let itemText = item => {
    return item.label ? item.label : item;
  };

  let multipleItems = item => {
    let text = itemText(item);
    if (facet_value) {
      return (
        <li key={text}>
          <a href={`/reactivesearch?${facet_value}=["${text}"]`}>{text}</a>
        </li>
      );
    } else {
      return <li key={text}>{text}</li>;
    }
  };

  let singleItem = item => {
    let text = itemText(item);
    if (facet_value) {
      return (
        <p key={text}>
          <a href={`/reactivesearch?${facet_value}=["${text}"]`}>{text}</a>
        </p>
      );
    } else {
      return <p key={text}>{text}</p>;
    }
  };

  let display;

  if (typeof items === 'string') display = singleItem(items);
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
