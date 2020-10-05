import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
  moreLess: {
    margin: "0 5px",
  },
};

const CollectionDescription = ({ description }) => {
  const [expanded, setExpanded] = useState();

  // Split the description by line breaks, so it displays properly
  const descriptionDisplay = description
    .split("\n")
    .map((i, key) => <p key={key}>{i}</p>);

  const tooLong = descriptionDisplay.length > 1;

  const handleClick = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <>
      {tooLong && !expanded && descriptionDisplay[0]}
      {(!tooLong || expanded) && descriptionDisplay}
      {tooLong && (
        <p>
          <a href="/" onClick={handleClick}>
            <FontAwesomeIcon
              icon={expanded ? "angle-up" : "angle-right"}
              style={styles.moreLess}
            />
            {expanded ? "Less" : "More"}
          </a>
        </p>
      )}
    </>
  );
};

CollectionDescription.propTypes = {
  description: PropTypes.string,
};

export default CollectionDescription;
