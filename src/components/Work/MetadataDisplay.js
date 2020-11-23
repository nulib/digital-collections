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
  external_url = "",
  collection,
  boxNumber,
}) => {
  if (!items) return null;

  const itemText = (item) => item.label || item;

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

  const moreInformation = () => {
    const contactIndex = items.indexOf("contact") + 7;

    return (
      <p>
        {`${items.substr(0, contactIndex)}`}{" "}
        <Mailto email={items.substr(contactIndex).trim()} />
      </p>
    );
  };

  const multipleItems = (item) => {
    let text = itemText(item);

    if (facet) {
      return <li key={text}>{linkElement(facet, text)}</li>;
    }

    if (externalUrlLabels.indexOf(title) > -1) {
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
    }

    return <li key={text}>{text}</li>;
  };

  return items.length > 0 ? (
    <>
      <h4>{title}</h4>
      {typeof items === "string" ? (
        title === "More Information" ? (
          moreInformation(items)
        ) : (
          <p>{facet ? linkElement(facet, itemText(items)) : itemText(items)}</p>
        )
      ) : (
        <ul>{items.map((item) => multipleItems(item))}</ul>
      )}
    </>
  ) : null;
};

MetadataDisplay.propTypes = {
  title: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  facet: PropTypes.object,
  external_url: PropTypes.string,
  collection: PropTypes.object,
  boxNumber: PropTypes.array,
};

export default MetadataDisplay;
