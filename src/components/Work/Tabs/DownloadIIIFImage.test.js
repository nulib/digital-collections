import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "./DownloadIIIFImage";
import DownloadIIIFImage from "./DownloadIIIFImage";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve("ABC")
  })
);

describe("DownloadIIIFImage component", () => {
  it("renders without crashing", () => {
    expect(render(<DownloadIIIFImage />));
  });

  it("displays an error message when passed a bad image url", () => {
    const { getByTestId } = render(<DownloadIIIFImage />);
    const el = getByTestId("download-button");
    fireEvent.click(el);
  });
});
