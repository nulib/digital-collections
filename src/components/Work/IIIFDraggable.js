import React from "react";
import PropTypes from "prop-types";
import iiifLogo from "../../images/IIIF-logo.png";

const styles = {
  iiifLogo: {
    width: "75px",
    height: "auto",
  },
};

const IIIFDraggable = (props) => {
  return (
    <a
      data-testid="iiif-draggable"
      href={`${props.iiifManifest}?manifest=${props.iiifManifest}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={iiifLogo}
        alt="IIIF Drag-n-drop"
        style={styles.iiifLogo}
        title="Drag me to share"
      />
    </a>
  );
};

IIIFDraggable.propTypes = {
  iiifManifest: PropTypes.string,
};

export default IIIFDraggable;
