import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const WorkOpenSeadragonToolbar = ({
  canDownloadFullSize,
  isMobile,
  onDownloadClick
}) => {
  function handleDownloadClick(e) {
    e.preventDefault();
    onDownloadClick();
  }

  return (
    <>
      <a
        id="zoom-in"
        data-testid="zoom-in"
        href="#zoom-in"
        className="toolbar-controls"
        title="Zoom In"
      >
        <FontAwesomeIcon icon="search-plus" />
      </a>
      <a
        id="zoom-out"
        data-testid="zoom-out"
        href="#zoom-out"
        className="toolbar-controls"
        title="Zoom Out"
      >
        <FontAwesomeIcon icon="search-minus" />
      </a>
      <a
        id="full-page"
        data-testid="full-page"
        href="#full-page"
        className="toolbar-controls"
        title="Full Screen"
      >
        <FontAwesomeIcon icon="expand" />
      </a>

      {!isMobile && (
        <a
          data-testid="download"
          href={`#nothing`}
          className="toolbar-controls"
          title="Download Image"
          onClick={handleDownloadClick}
        >
          <FontAwesomeIcon icon="download" />
        </a>
      )}
      <a
        id="previous"
        data-testid="previous"
        href="#previous"
        className="toolbar-controls"
        title="Previous"
      >
        <FontAwesomeIcon icon="arrow-circle-left" />
      </a>
      <a
        id="next"
        data-testid="next"
        href="#next"
        className="toolbar-controls"
        title="Next"
      >
        <FontAwesomeIcon icon="arrow-circle-right" />
      </a>
    </>
  );
};

WorkOpenSeadragonToolbar.propTypes = {
  canDownloadFullSize: PropTypes.bool,
  isMobile: PropTypes.bool,
  onDownloadClick: PropTypes.func
};

export default WorkOpenSeadragonToolbar;
