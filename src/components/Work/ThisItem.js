import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { IIIF_LARGE_FEATURE_REGION } from "../../services/global-vars";

const ThisItem = props => {
  const { item } = props;
  const styles = {
    caret: {
      fontSize: "6rem",
      color: "#f0f0f0"
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "5rem"
    }
  };

  return (
    <div
      data-testid="this-item"
      className="this-item-wrapper"
      style={styles.wrapper}
    >
      <div>
        <FontAwesomeIcon icon="caret-down" style={styles.caret} />
      </div>
      <p>This item</p>
      <img
        src={item && `${item.thumbnail_url}${IIIF_LARGE_FEATURE_REGION}`}
        alt={item && item.label}
      />
    </div>
  );
};

ThisItem.propTypes = {
  item: PropTypes.object
};

export default ThisItem;
