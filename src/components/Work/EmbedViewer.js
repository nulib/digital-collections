import { useState } from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const embedViewer = css`
  margin-top: 1rem;
`;
const embedWrapper = css`
  background: white;
  border: 1px dashed lightgrey;
  margin: 1rem 0 2rem;
  padding: 1rem 2rem;
  word-break: break-all;
`;
const code = css`
  font-family: monospace;
  font-size: 0.8333rem;
`;
const copiedText = css`
  font-family: inherit;
  color: #008656;
`;

export default function WorkEmbedViewer({ item }) {
  const [copied, setCopied] = useState(false);

  const { descriptiveMetadata, iiifManifest, workType } = item;
  const manifestUrlParam = encodeURIComponent(iiifManifest);
  const workTypeParam = workType.label.toLowerCase();

  // Generate iframe embed code
  // In the future possibly support user entered params?
  const embedString = `
  <iframe 
  src="${window.location.origin}/embedded-viewer/${manifestUrlParam}/${workTypeParam}" 
  title="${descriptiveMetadata.title}" 
  width="100%" 
  height="800"></iframe>`;

  const handleCopyClick = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div data-testid="embed-viewer" css={embedViewer}>
      <h4>Embed Rich Viewer</h4>
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
    </div>
  );
}

WorkEmbedViewer.propTypes = {
  item: PropTypes.object,
};
