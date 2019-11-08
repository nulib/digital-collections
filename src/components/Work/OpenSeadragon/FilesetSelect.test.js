import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WorkOpenSeadragonFilesetSelect from "./FilesetSelect";

const mockOnFileSetChange = jest.fn();
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

describe("WorkOpenSeadragonFilesetSelect", () => {
  function setUpTest(
    props = {
      currentTileSource: tileSources[1],
      onFileSetChange: mockOnFileSetChange,
      tileSources
    }
  ) {
    return render(<WorkOpenSeadragonFilesetSelect {...props} />);
  }

  it("renders without crashing", () => {
    const { container } = render(<WorkOpenSeadragonFilesetSelect />);
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

  it("renders the right information in select options", () => {
    const { getByTestId } = setUpTest();
    const select = getByTestId("filesets-select");
    const options = select.children;

    expect(options[1].value).toEqual(tileSources[1].id);
    expect(options[1].innerHTML).toEqual(`2 of 3: ${tileSources[1].label}`);

    expect(options[2].value).toEqual(tileSources[2].id);
    expect(options[2].innerHTML).toEqual(`3 of 3: ${tileSources[2].label}`);
  });

  it("calls back a function when select value changes", () => {
    const { getByTestId } = setUpTest();
    fireEvent.change(getByTestId("filesets-select"));
    expect(mockOnFileSetChange).toHaveBeenCalled();
  });
});
