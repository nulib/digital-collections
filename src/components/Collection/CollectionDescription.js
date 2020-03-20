import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
  moreLess: {
    margin: "0 5px"
  }
};

const CollectionDescription = ({ description }) => {
  const [expanded, setExpanded] = useState();
  const tooLong = description.length > 1;

  const handleClick = e => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <>
      {tooLong && !expanded && description[0]}
      {(!tooLong || expanded) && description}
      {tooLong && (
        <a href="/" onClick={handleClick}>
          <FontAwesomeIcon
            icon={expanded ? "angle-up" : "angle-right"}
            style={styles.moreLess}
          />
          {expanded ? "Less" : "More"}
        </a>
      )}
    </>
  );
};

CollectionDescription.propTypes = {
  description: PropTypes.string
};

export default CollectionDescription;
