import React, { useState } from "react";
import PropTypes from "prop-types";
import DownloadIIIFImageButton from "./DownloadIIIFImageButton";

async function makeBlob(imageUrl) {
  if (!imageUrl) {
    return Promise.resolve({ error: true, message: "No image URL provided" });
  }

  return fetch(imageUrl)
    .then((blobResponse) => {
      return blobResponse.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    })
    .catch((e) => {
      return Promise.resolve({
        error: true,
        message: "Error creating image from url",
      });
    });
}

// Create a DOM element anchor to hold the Blog image
// initiate a click event on it to force the download
function mimicDownload(blob, imageTitle) {
  const a = document.createElement("a");
  a.href = blob;
  a.download = imageTitle;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// https://stackoverflow.com/questions/51076581/download-images-using-html-or-javascript
const DownloadIIIFImage = ({ imageUrl, imageTitle }) => {
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

    mimicDownload(response, imageTitle);
    setLoading(false);
  }

  return (
    <DownloadIIIFImageButton
      handleClick={handleClick}
      loading={loading}
      error={error}
    />
  );
};

DownloadIIIFImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
};

export default DownloadIIIFImage;
