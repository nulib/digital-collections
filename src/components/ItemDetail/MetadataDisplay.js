import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Mailto from 'react-protected-mailto';

// Array of metadata items which are urls and should link externally
const externalUrlLabels = ['Related Url', 'Catalog Key'];

const MetadataDisplay = props => {
  const { title, items, facet_value = '', external_url = '' } = props;

  let itemText = item => {
    return item.label ? item.label : item;
  };

  let linkElement = (facetValue, searchValue) => {
    // TODO: create a map object for 'facetValue' in globals, so it's not just assumed that it's camelCased
    const adjustedFacetValue = facetValue.split(' ').join('');
    const adjustedSearchValue = searchValue.split(' ').join('+');
    const encoded = encodeURI(
      `${adjustedFacetValue}=["${adjustedSearchValue}"]`
    );
    return <Link to={`/search?${encoded}`}>{searchValue}</Link>;
  };

  let multipleItems = item => {
    let text = itemText(item);
    if (facet_value) {
      return <li key={text}>{linkElement(facet_value, text)}</li>;
    } else if (externalUrlLabels.indexOf(title) > -1) {
      return (
        <li key={text}>
          <a
            href={external_url ? external_url : text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        </li>
      );
    } else {
      return <li key={text}>{text}</li>;
    }
  };

  let singleItem = item => {
    let text = itemText(item);
    if (facet_value) {
      return <p key={text}>{linkElement(facet_value, text)}</p>;
    } else {
      return <p key={text}>{text}</p>;
    }
  };

  let moreInformation = item => {
    const contactIndex = items.indexOf('contact') + 7;
    const email = items.substr(contactIndex).trim();
    return (
      <p key={itemText(items)}>
        {`${items.substr(0, contactIndex)}`} <Mailto email={email} />
      </p>
    );
  };

  let display;

  if (typeof items === 'string') {
    // More Information metadata field, need to obfuscate email address
    if (title === 'More Information') {
      display = moreInformation(items);
    } else {
      display = singleItem(items);
    }
  } else if (Array.isArray(items)) {
    display = items.map(item => multipleItems(item));
  }

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
