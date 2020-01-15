import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WorkOpenSeadragonFilesetReactSelect from "./FilesetReactSelect";

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

describe("WorkOpenSeadragonFilesetReactSelect", () => {
  function setUpTest(
    props = {
      currentTileSource: tileSources[1],
      onFileSetChange: mockOnFileSetChange,
      tileSources
    }
  ) {
    return render(<WorkOpenSeadragonFilesetReactSelect {...props} />);
  }

  it("renders without crashing", () => {
    const { container } = render(<WorkOpenSeadragonFilesetReactSelect />);
    expect(container).toBeTruthy();
  });

  it("renders the react-select element and search box", () => {
    const { getByTestId } = setUpTest();
    const el = getByTestId("react-select-wrapper");
    const elContainer = el.querySelector(".react-select-container");

    expect(el).toBeInTheDocument();
    expect(elContainer).toBeInTheDocument();
  });

  it("renders current tilesource as a selected option", () => {
    const { getByTestId } = setUpTest();
    const el = getByTestId("react-select-wrapper");
    const selectedEl = el.querySelector(".react-select__single-value");
    expect(selectedEl.innerHTML).toEqual("Fileset 2");
  });

  it("renders the right information in select options", () => {
    const { getByTestId } = setUpTest();
    const el = getByTestId("react-select-wrapper");
    const inputEl = el.querySelector("input");

    fireEvent.change(inputEl, { target: { value: "3" } });
    expect(el.querySelector(".react-select__option").innerHTML).toEqual(
      "Fileset 3"
    );
  });

  it("calls back a function when select value changes", () => {
    const { getByTestId, getByText } = setUpTest();
    const el = getByTestId("react-select-wrapper");
    const inputEl = el.querySelector("input");

    fireEvent.change(inputEl, { target: { value: "3" } });

    const optionEl = getByText("Fileset 3");
    fireEvent.click(optionEl);
    expect(mockOnFileSetChange).toHaveBeenCalled();
  });
});
