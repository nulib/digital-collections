import React from "react";
import { render } from "@testing-library/react";
import WorkOpenSeadragonTopBar from "./TopBar";

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

const mockOnFileSetChange = jest.fn();

describe("WorkOpenSeadragonTopBar component", () => {
  function setUpTest() {
    return render(
      <WorkOpenSeadragonTopBar
        tileSources={tileSources}
        onFileSetChange={mockOnFileSetChange}
        currentTileSource={tileSources[1]}
      />
    );
  }
  it("renders without crashing", () => {
    const { container } = setUpTest();
    expect(container).toBeTruthy();
  });

  it("renders a select element with tile source labels", () => {
    const { getByTestId } = setUpTest();
    const select = getByTestId("filesets-select");
    expect(select).toBeInTheDocument();
  });

  it("renders tilesources as options in the select element", () => {
    const { getByTestId } = setUpTest();
    const select = getByTestId("filesets-select");
    expect(select.children.length).toEqual(3);
  });

  it("renders tile source label for currently selecred tile source", () => {
    const { getByTestId } = setUpTest();
    const labelEl = getByTestId("fileset-label");
    expect(labelEl).toBeInTheDocument();
    expect(labelEl.innerHTML).toEqual("Fileset 2");
  });
});
