import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const embedButton = css`
  font-family: "Akkurat Pro Regular" !important;
  font-size: 1.25rem;
`;
const embedSection = css`
  text-align: center;
  padding: 2rem 0;
`;
const embedWrapper = css`
  background: white;
  border: 1px dashed lightgrey;
  margin-top: 1rem;
  padding: 1rem 2rem;
  word-break: break-all;
`;
const code = css`
  font-family: monospace;
`;
const copiedText = css`
  font-family: inherit;
  color: #008656;
`;

export default function WorkEmbedViewer({ item }) {
  const [isEmbedVisible, setIsEmbedVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate iframe embed code
  // In the future possibly support user entered params?
  const embedString = `<iframe src="${
    window.location.origin
  }/embedded-viewer/${encodeURIComponent(item.iiifManifest)}" title="${
    item.descriptiveMetadata.title
  }" width="100%" height="800"></iframe>`;

  const handleCopyClick = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleEmbedViewerClick = () => {
    setIsEmbedVisible(!isEmbedVisible);
  };

  return (
    <div data-testid="embed-viewer">
      <div css={embedSection}>
        <button
          data-testid="button-embed-viewer"
          className="button-link"
          css={embedButton}
          onClick={handleEmbedViewerClick}
        >
          <FontAwesomeIcon icon="images" />
          {"  "}Embed Rich Image Viewer
        </button>
      </div>

      {isEmbedVisible && (
        <div data-testid="embed-viewer-code" css={embedWrapper}>
          <code css={code}>{embedString}</code>

          {copied ? (
            <p css={copiedText}>Copied</p>
          ) : (
            <p>
              <CopyToClipboard text={embedString} onCopy={handleCopyClick}>
                <button className="button-link" type="button">
                  Copy Code
                </button>
              </CopyToClipboard>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

WorkEmbedViewer.propTypes = {
  item: PropTypes.object,
};
