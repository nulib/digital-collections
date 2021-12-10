import React from "react";
import { renderWithRouter } from "../services/@testing-library-helpers";
import { Route } from "react-router-dom";
import ScreensEmbeddedViewer from "./EmbeddedViewer";

describe("ScreensEmbeddedViewer component", () => {
  const manifestUrl =
    "https%3A%2F%2Fiiif.stack.rdc-staging.library.northwestern.edu%2Fpublic%2Fc9%2Fc5%2F59%2Fa9%2F-5%2F94%2F4-%2F41%2F81%2F-8%2F56%2Fc-%2Fd5%2F5a%2Fc6%2F89%2F63%2F56-manifest.json";

  function embeddedViewer(workType = "") {
    const route = `/embedded-viewer/${manifestUrl}/${workType}`;

    return renderWithRouter(
      <Route
        path="/embedded-viewer/:manifestUrl/:workType?"
        component={ScreensEmbeddedViewer}
      />,
      { route }
    );
  }

  it("renders the embedded-viewer (React OpenSeadragon) if workType param is empty", () => {
    const { getByTestId } = embeddedViewer();
    expect(getByTestId("embedded-viewer-image")).toBeInTheDocument();
  });

  it("renders the embedded-viewer (React OpenSeadragon) if workType is `image`", () => {
    const { getByTestId } = embeddedViewer("image");
    expect(getByTestId("embedded-viewer-image")).toBeInTheDocument();
  });

  it("renders the embedded-viewer (React Media Player) if workType is `audio`", () => {
    const { getByTestId } = embeddedViewer("audio");
    expect(getByTestId("embedded-viewer-av")).toBeInTheDocument();
  });

  it("renders the embedded-viewer (React Media Player) if workType is `video`", () => {
    const { getByTestId } = embeddedViewer("video");
    expect(getByTestId("embedded-viewer-av")).toBeInTheDocument();
  });
});
