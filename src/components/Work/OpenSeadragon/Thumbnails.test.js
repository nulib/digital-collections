import React from "react";
import { render } from "@testing-library/react";
import WorkOpenSeadragonThumbnails from "./Thumbnails";

const mockOnThumbClick = jest.fn();

const tileSources = [
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/1",
    label: "Fileset 1"
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/2",
    label: "Fileset 2"
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/3",
    label: "Fileset 3"
  }
];

describe("WorkOpenSeadragonThumbnails component", () => {
  function setUp() {
    return render(
      <WorkOpenSeadragonThumbnails
        tileSources={tileSources}
        onThumbClick={mockOnThumbClick}
      />
    );
  }

  it("renders without crashing", () => {
    const { container } = render(<WorkOpenSeadragonThumbnails />);
    expect(container).toBeTruthy();
  });

  it("renders thumbnails container", () => {
    const { getByTestId } = setUp();
    expect(
      getByTestId("open-seadragon-thumbnails-container")
    ).toBeInTheDocument();
    expect();
  });

  it("renders the correct number of thumbnails", () => {
    const { queryAllByTestId } = setUp();
    expect(queryAllByTestId("fileset-thumbnail")).toHaveLength(3);
  });
});
