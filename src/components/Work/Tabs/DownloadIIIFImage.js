import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from "react-spinners/ClipLoader";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const errorMessage = css`
  color: #b2292e;
`;

// https://stackoverflow.com/questions/51076581/download-images-using-html-or-javascript
const DownloadIIIFImage = ({ imageUrl, label }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  //const yo = "http://www.foo.bar";

  function handleClick() {
    setError(false);

    function toDataURL(url) {
      return fetch(url)
        .then(response => {
          return response.blob();
        })
        .then(blob => {
          return URL.createObjectURL(blob);
        })
        .catch(e => {
          console.log("Error creating blob", e);
        });
    }

    async function makeBlob() {
      const a = document.createElement("a");
      const response = await toDataURL(imageUrl);
      console.log("response", response);

      // Handle error
      if (!response) {
        setError(true);
        setLoading(false);
        return;
      }

      a.href = response;
      a.download = label ? label.split(" ").join("_") : "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setLoading(false);
    }

    setLoading(true);
    makeBlob();
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
      {error && <p css={errorMessage}>Error creating file download object</p>}
    </div>
  );
};

DownloadIIIFImage.propTypes = {
  imageUrl: PropTypes.string,
  label: PropTypes.string
};

export default DownloadIIIFImage;
