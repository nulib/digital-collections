import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const WorkOpenSeadragonToolbar = ({
  isMobile,
  onDownloadCropClick,
  onDownloadFullSize
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  function handleDownloadClick(e) {
    e.preventDefault();
    setDropDownOpen(!dropDownOpen);
  }

  function handleDownloadCropClick(e) {
    e.preventDefault();
    onDownloadCropClick();
    setDropDownOpen(false);
  }

  function handleDownloadFullSize(e) {
    e.preventDefault();
    onDownloadFullSize();
    setDropDownOpen(false);
  }

  return (
    <nav>
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
        <div className="openseadragon-toolbar-dropdown-wrapper">
          <a
            href={`#nothing`}
            data-testid="download"
            onClick={handleDownloadClick}
            className="toolbar-controls"
            aria-haspopup="true"
            aria-expanded={dropDownOpen}
          >
            <FontAwesomeIcon icon="download" />
          </a>
          {dropDownOpen && (
            <ul className={`openseadragon-toolbar-dropdown`}>
              <li>
                <a
                  href={`#nothing`}
                  data-testid="download-crop"
                  title="Download Crop"
                  onClick={handleDownloadCropClick}
                >
                  Download crop
                </a>
              </li>
              <li>
                <a
                  href="#nothing"
                  data-testid="download-full"
                  onClick={handleDownloadFullSize}
                >
                  Download full size
                </a>
              </li>
            </ul>
          )}
        </div>
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
    </nav>
  );
};

WorkOpenSeadragonToolbar.propTypes = {
  isMobile: PropTypes.bool,
  onDownloadCropClick: PropTypes.func,
  onDownloadFullSize: PropTypes.func
};

export default WorkOpenSeadragonToolbar;
