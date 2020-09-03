import React from "react";
import { OpenSeadragonViewer } from "openseadragon-react-viewer";
import { useParams } from "react-router-dom";

export default function ScreensEmbeddedViewer() {
  const params = useParams();

  console.log("params", params);

  return (
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
  );
}
