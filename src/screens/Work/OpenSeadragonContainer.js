import React from "react";
import { OpenSeadragonViewer } from "openseadragon-react-viewer";
import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

const styles = {
  spinner: {
    padding: "50px 0",
  },
  wrapper: {
    background: "#342f2e",
    position: "relative",
    textAlign: "center",
  },
};

export default function OpenSeadragonContainer({ item }) {
  const options = {
    showDropdown: true,
    showThumbnails: true,
    showToolbar: true,
    deepLinking: true,
    height: 800,
  };

  if (!item) {
    return null;
  }

  return (
    <section style={styles.wrapper} data-testid="section-open-seadragon">
      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <OpenSeadragonViewer
          manifestUrl={item.iiifManifest}
          options={options}
        />
      </ErrorBoundary>
    </section>
  );
}

OpenSeadragonContainer.propTypes = {
  item: PropTypes.object,
};
