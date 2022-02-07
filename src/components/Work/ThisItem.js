import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { IIIF_LARGE_FEATURE_REGION } from "../../services/global-vars";
import imgPlaceholder from "images/book_placeholder.png";
import avPlaceholder from "images/av_placeholder.png";

const imagePlaceholder = (workType) => {
  return workType === "IMAGE" ? imgPlaceholder : avPlaceholder;
};

const ThisItem = (props) => {
  const { item } = props;
  const styles = {
    caret: {
      fontSize: "6rem",
      color: "#f0f0f0",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "5rem",
    },
    thisItemImage: {
      width: "300px",
      height: "auto",
    },
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
        src={
          item &&
          (item.representativeFileSet?.url
            ? `${item.representativeFileSet.url}${IIIF_LARGE_FEATURE_REGION}`
            : imagePlaceholder(item.workType.id))
        }
        alt={item && item.label}
        style={styles.thisItemImage}
      />
    </div>
  );
};

ThisItem.propTypes = {
  item: PropTypes.object,
};

export default ThisItem;
