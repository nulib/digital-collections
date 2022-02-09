// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { CopyToClipboard } from "react-copy-to-clipboard";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const wrapper = css`
  font-size: 1rem;
`;
const alert = css`
  background: #008656;
  font-weight: bold;
  padding: 1rem;
  color: #fff;
  text-align: center;
`;
const buttons = css`
  button {
    background: #716c6b;
    &:hover,
    &.active {
      background: #bbb8b8;
    }
    &.big {
      font-size: 1.5rem;
    }
    &.medium {
      font-size: 1.25rem;
    }
    &.small {
      font-size: 0.9rem;
    }
  }
`;
const embedForm = css`
  textarea[readonly] {
    line-height: 1.5rem;
    font-size: 1.25rem;
    font-family: monospace;
    padding: 1rem;
    height: 200px;
  }
`;
const legend = css`
  margin-bottom: 0.75rem !important;
`;
const row = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const column = css`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;
const footer = css`
  text-align: right;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #efefef;
  button {
    margin-left: 1rem;
  }
`;

export default function IIIFImageEmbedModal({
  altLabel,
  closeModal,
  id,
  iiifServerUrl,
  modalOpen,
}) {
  const [color, setColor] = useState("default");
  const [width, setWidth] = useState(3000);
  const [embedCode, setEmbedCode] = useState();
  const [copied, setCopied] = useState();

  useEffect(() => {
    function buildTag() {
      return `<img src="${iiifServerUrl}/full/${width},/0/${color}.jpg" alt="${altLabel}" />`;
    }
    setEmbedCode(buildTag());
  }, [id, color, iiifServerUrl, width, altLabel]);

  function handleClose() {
    setCopied(false);

    // Reset to defaults
    setWidth(3000);
    setColor("default");

    closeModal();
  }

  function handleColorChange(e) {
    setColor(e.target.value);
    setCopied(false);
  }

  function handleWidthChange(width) {
    setWidth(width);
    setCopied(false);
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          left: "100px",
          right: "100px",
          bottom: "auto",
        },
      }}
    >
      <div data-testid="image-embed-modal" className="content" css={wrapper}>
        <h2>HTML Embed</h2>
        <div css={[row, embedForm]} className="web-form">
          <div css={column}>
            <div css={buttons}>
              <p>
                <button
                  className={`button big ${width === 3000 ? "active" : ""}`}
                  onClick={() => handleWidthChange(3000)}
                >
                  3000 pixels (100%)
                </button>
              </p>
              <p>
                <button
                  className={`button medium ${width === 1800 ? "active" : ""}`}
                  onClick={() => handleWidthChange(1800)}
                >
                  1800 pixels (500%)
                </button>
              </p>
              <p>
                {" "}
                <button
                  className={`button ${width === 900 ? "active" : ""}`}
                  onClick={() => handleWidthChange(900)}
                >
                  900 pixels (250%)
                </button>
              </p>
              <p>
                <button
                  className={`button small ${width === 450 ? "active" : ""}`}
                  onClick={() => handleWidthChange(450)}
                >
                  450 pixels (12%)
                </button>
              </p>
            </div>

            <fieldset>
              <legend css={legend}>
                <strong>Image color</strong>
              </legend>
              <input
                id="default"
                name="color"
                type="radio"
                value="default"
                onChange={handleColorChange}
                checked={color === "default"}
              />
              <label className="inline" htmlFor="default">
                Default
              </label>

              <input
                id="bitonal"
                name="color"
                type="radio"
                value="bitonal"
                onChange={handleColorChange}
                checked={color === "bitonal"}
              />
              <label className="inline" htmlFor="bitonal">
                Bitonal
              </label>

              <input
                id="gray"
                name="color"
                type="radio"
                value="gray"
                onChange={handleColorChange}
                checked={color === "gray"}
              />
              <label className="inline" htmlFor="gray">
                Gray
              </label>
            </fieldset>
          </div>
          <div css={column}>
            <h3>HTML Tag</h3>
            <textarea readOnly value={embedCode} />
            {copied && <p css={alert}>Copied</p>}
          </div>
        </div>
        <div css={footer}>
          {copied ? (
            <button className="button" onClick={handleClose}>
              Close
            </button>
          ) : (
            <div>
              <button className="button-link" onClick={() => closeModal()}>
                Cancel
              </button>
              <CopyToClipboard text={embedCode} onCopy={() => setCopied(true)}>
                <button className="button">Copy Code</button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

IIIFImageEmbedModal.propTypes = {
  altLabel: PropTypes.string,
  closeModal: PropTypes.func,
  id: PropTypes.string,
  iiifServerUrl: PropTypes.string,
  modalOpen: PropTypes.bool,
};
