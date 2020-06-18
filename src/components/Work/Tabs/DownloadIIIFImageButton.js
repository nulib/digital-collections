import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from "react-spinners/ClipLoader";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const errorMessage = css`
  color: #b2292e;
`;

const DownloadIIIFImageButton = ({ handleClick, loading, error }) => {
  return (
    <div>
      <button
        data-testid="download-button"
        onClick={handleClick}
        className="button-link"
      >
        {!loading && <FontAwesomeIcon icon="download" />}{" "}
        {loading && (
          <span data-testid="loader">
            <ClipLoader color={"#4e2a84"} size={16} />
          </span>
        )}{" "}
        Download
      </button>
      {error && (
        <p css={errorMessage} data-testid="error-message">
          {error}
        </p>
      )}
    </div>
  );
};

DownloadIIIFImageButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default DownloadIIIFImageButton;
