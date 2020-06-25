import React from "react";
import { OpenSeadragonViewer } from "openseadragon-react-viewer";
import PropTypes from "prop-types";

const styles = {
  spinner: {
    padding: "50px 0"
  },
  wrapper: {
    background: "#342f2e",
    position: "relative",
    textAlign: "center"
  }
};

export default function OpenSeadragonContainer({ item }) {
  const options = {
    showDropdown: true,
    showThumbnails: true,
    showToolbar: true,
    deepLinking: true
  };

  return (
    <section style={styles.wrapper} data-testid="section-open-seadragon">
      <OpenSeadragonViewer manifestUrl={item.iiif_manifest} options={options} />
    </section>
  );
}

OpenSeadragonContainer.propTypes = {
  item: PropTypes.object
};
