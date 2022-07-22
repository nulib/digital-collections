import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getESTitle } from "services/elasticsearch-parser";

const externalUrlLabels = ["NUsearch"];

function prepItemText(item) {
  if (item.term) {
    return item.term.label || "";
  }
  if (item.label) {
    return item.label.label;
  }
  // For Notes metadata field
  if (item.note) {
    return `${item.type.label} - ${item.note}`;
  }
  return item;
}

const MetadataDisplay = ({
  boxNumber,
  collection,
  externalUrl,
  items = [],
  title,
  facet,
}) => {
  if (!items) return null;

  const linkElement = (facet, searchValue) => {
    let adjustedSearchValue = searchValue.split(" ").join("+");
    let encoded = encodeURI(`${facet.value}=["${adjustedSearchValue}"]`);
    const collectionTitle = getESTitle(collection, true);

    // Folder should filter on "collection", "box", and "folder" facets
    if (facet.componentId === "FolderNumber") {
      encoded = encodeURI(
        `FolderNumber=["${adjustedSearchValue}"]&Box=["${
          boxNumber[0]
        }"]&Collection=["${collectionTitle.split(" ").join("+")}"]`
      );
      return <Link to={`/search?${encoded}`}>{searchValue}</Link>;
    }

    // Box should only filter on "collection" and "box" facets
    if (facet.componentId === "BoxNumber") {
      encoded = encodeURI(
        `BoxNumber=["${adjustedSearchValue}"]&Collection=["${collectionTitle
          .split(" ")
          .join("+")}"]`
      );
      return <Link to={`/search?${encoded}`}>{searchValue}</Link>;
    }

    return (
      <Link
        to={{
          pathname: "/search",
          state: {
            facet,
            searchValue,
          },
        }}
      >
        {searchValue}
      </Link>
    );
  };

  // TODO: Refactor this implementation
  const multipleItems = (item) => {
    let text = "";
    if (title === "Contributor") {
      text = item.displayFacet;
    } else {
      text = prepItemText(item);
    }

    // Provide a link to Search on facet value which populates a new search
    if (facet) {
      return <li key={text}>{linkElement(facet, text)}</li>;
    }

    // Link to an external URL outside our app
    if (externalUrlLabels.indexOf(title) > -1) {
      return (
        <li key={text}>
          <a href={externalUrl || ""} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </li>
      );
    }

    if (title === "Related Url") {
      return (
        <li key={text}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </li>
      );
    }

    if (title === "Notes") {
      return <li key={text}>{text}</li>;
    }

    return <li key={text}>{text}</li>;
  };

  return items.length > 0 ? (
    <>
      <h4>{title}</h4>
      {typeof items === "string" ? (
        <p>
          {facet
            ? linkElement(facet, prepItemText(items))
            : prepItemText(items)}
        </p>
      ) : (
        <ul>{items.map((item, i) => multipleItems(item, i))}</ul>
      )}
    </>
  ) : null;
};

MetadataDisplay.propTypes = {
  title: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  facet: PropTypes.object,
  externalUrl: PropTypes.string,
  collection: PropTypes.object,
  boxNumber: PropTypes.array,
};

export default MetadataDisplay;
