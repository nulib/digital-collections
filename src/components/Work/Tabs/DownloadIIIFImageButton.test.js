import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DownloadIIIFImageButton from "./DownloadIIIFImageButton";

const mockFn = jest.fn();

describe("DownloadIIIFImageButton component", () => {
  it("renders the download button", () => {
    const { getByTestId, queryByTestId } = render(
      <DownloadIIIFImageButton handleClick={mockFn} />
    );
    expect(getByTestId("download-button")).toBeInTheDocument();
    expect(queryByTestId("loader")).toBeNull();
    expect(queryByTestId("error-message")).toBeNull();
  });

  it("displays the loading indicator when loading", () => {
    const { getByTestId } = render(
      <DownloadIIIFImageButton handleClick={mockFn} loading={true} />
    );
    expect(getByTestId("download-button")).toBeInTheDocument();
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("displays an error message when error", () => {
    const { getByText } = render(
      <DownloadIIIFImageButton
        handleClick={mockFn}
        loading={true}
        error="Something bad happened"
      />
    );
    expect(getByText(/something bad happened/i)).toBeInTheDocument();
  });

  it("calls the click handler callback function", () => {
    const { getByTestId } = render(
      <DownloadIIIFImageButton handleClick={mockFn} loading={false} />
    );

    fireEvent.click(getByTestId("download-button"));
    expect(mockFn).toHaveBeenCalled();
  });
});
