import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from "react-spinners/ClipLoader";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const errorMessage = css`
  color: #b2292e;
`;

async function makeBlob(imageUrl) {
  if (!imageUrl) {
    return Promise.resolve({ error: true, message: "No image URL provided" });
  }

  const response = fetch(imageUrl)
    .then(blobResponse => {
      return blobResponse.blob();
    })
    .then(blob => {
      return URL.createObjectURL(blob);
    })
    .catch(e => {
      return Promise.resolve({
        error: true,
        message: "Error creating image from url"
      });
    });

  return response;
}

// https://stackoverflow.com/questions/51076581/download-images-using-html-or-javascript
const DownloadIIIFImage = ({ imageUrl, label }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function handleClick() {
    setLoading(true);
    setError(null);

    const response = await makeBlob(imageUrl);

    // Handle error
    if (!response || response.error) {
      setError(
        response.error
          ? response.message
          : "There was an error creating the image"
      );
      setLoading(false);
      return;
    }

    // Create a DOM element anchor to hold the Blog image
    // initiate a click event on it to force the download
    const a = document.createElement("a");
    a.href = response;
    a.download = label ? label.split(" ").join("_") : "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(false);
  }

  return (
    <div>
      <button
        data-testid="download-button"
        onClick={handleClick}
        className="button-link"
      >
        {!loading && <FontAwesomeIcon icon="download" />}{" "}
        {loading && <ClipLoader color={"#4e2a84"} size={16} />} Download
      </button>
      {error && <p css={errorMessage}>{error}</p>}
    </div>
  );
};

DownloadIIIFImage.propTypes = {
  imageUrl: PropTypes.string,
  label: PropTypes.string
};

export default DownloadIIIFImage;
