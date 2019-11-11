import React from "react";
import WorkOpenSeadragonToolbar from "./Toolbar";
import { render } from "@testing-library/react";

describe("WorkOpenSeadragonToolbar component", () => {
  function setUpTest(
    props = {
      canDownloadFullSize: false,
      downloadLink: "http://www.link.com",
      isMobile: false,
      itemTitle: "Andy Warhol Retrospective"
    }
  ) {
    return render(<WorkOpenSeadragonToolbar {...props} />);
  }

  it("renders without crashing", () => {
    const { container } = setUpTest();
    expect(container).toBeTruthy();
  });

  it("renders all toolbar controls", () => {
    const { getByTestId, queryByTestId } = setUpTest();
    expect(getByTestId("zoom-in")).toBeInTheDocument();
    expect(getByTestId("zoom-out")).toBeInTheDocument();
    expect(getByTestId("full-page")).toBeInTheDocument();
    expect(queryByTestId("download")).toBeInTheDocument();
    expect(getByTestId("previous")).toBeInTheDocument();
    expect(getByTestId("next")).toBeInTheDocument();
  });

  it("Does not render a download link on mobile", () => {
    const { queryByTestId } = setUpTest({
      isMobile: true,
      canDownloadFullSize: true
    });
    expect(queryByTestId("full-size-download")).not.toBeInTheDocument();
  });
});
