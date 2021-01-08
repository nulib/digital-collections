import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Mailto from "react-protected-mailto";
import { getESTitle } from "../../services/elasticsearch-parser";

const externalUrlLabels = ["Related Url", "NUsearch"];

const MetadataDisplay = ({
  title,
  items,
  facet,
  externalUrl = "",
  collection,
  boxNumber,
}) => {
  if (!items) return null;

  const itemText = (item) => (item.label || item.term ? item.term.label : item);

  const linkElement = (facet, searchValue) => {
    let adjustedSearchValue = searchValue.split(" ").join("+");
    let encoded = encodeURI(`${facet.value}=["${adjustedSearchValue}"]`);
    const collectionTitle = getESTitle(collection);

    // Folder should filter on "collection", "box", and "folder" facets
    if (facet.value === "Folder") {
      encoded = encodeURI(
        `Folder=["${adjustedSearchValue}"]&Box=["${
          boxNumber[0]
        }"]&Collection=["${collectionTitle.split(" ").join("+")}"]`
      );

      return <Link to={`/search?${encoded}`}>{searchValue}</Link>;
    }

    // Box should only filter on "collection" and "box" facets
    if (facet.value === "Box") {
      encoded = encodeURI(
        `Box=["${adjustedSearchValue}"]&Collection=["${collectionTitle
          .split(" ")
          .join("+")}"]`
      );
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

  const multipleItems = (item, i) => {
    let text = itemText(item);

    if (facet) {
      return <li key={(text, i)}>{linkElement(facet, text)}</li>;
    }

    if (externalUrlLabels.indexOf(title) > -1) {
      return (
        <li key={(text, i)}>
          <a
            href={externalUrl ? externalUrl : text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        </li>
      );
    }

    return <li key={text}>{text}</li>;
  };

  return items.length > 0 ? (
    <>
      <h4>{title}</h4>
      {typeof items === "string" ? (
        <p>{facet ? linkElement(facet, itemText(items)) : itemText(items)}</p>
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
