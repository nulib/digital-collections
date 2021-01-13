import React from "react";
import { OpenSeadragonViewer } from "openseadragon-react-viewer";
import { useParams } from "react-router-dom";
import logo from "../images/northwestern-white.png";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const embedWrapper = css`
  position: relative;
`;
const imgLogo = css`
  position: absolute;
  bottom: 0px;
  left: 10px;
  z-index: 10;
  width: 220px;
`;

export default function ScreensEmbeddedViewer() {
  const params = useParams();

  return (
    <div className="embeded-viewer-wrapper" css={embedWrapper}>
      <img src={logo} alt="Northwestern logo" css={imgLogo} />
      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <OpenSeadragonViewer
          manifestUrl={decodeURIComponent(params.manifestUrl)}
          options={{
            showDropdown: true,
            showThumbnails: true,
            showToolbar: true,
            deepLinking: false,
            height: 800,
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
