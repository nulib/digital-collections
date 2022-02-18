import { OpenSeadragonViewer } from "openseadragon-react-viewer";
import CloverIIIF from "@samvera/clover-iiif";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const embedWrapper = css`
  position: relative;
`;

export default function ScreensEmbeddedViewer() {
  const { manifestUrl, workType = "image" } = useParams();
  const manifestId = decodeURIComponent(manifestUrl);

  return (
    <div className="embeded-viewer-wrapper" css={embedWrapper}>
      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        {workType === "image" && (
          <div data-testid="embedded-viewer-image">
            <OpenSeadragonViewer
              manifestUrl={manifestId}
              options={{
                showDropdown: true,
                showThumbnails: true,
                showToolbar: true,
                deepLinking: false,
                height: 800,
              }}
            />
          </div>
        )}
        {["audio", "video"].includes(workType) && (
          <div data-testid="embedded-viewer-av">
            <CloverIIIF manifestId={manifestId} />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
