import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "./DownloadIIIFImage";
import DownloadIIIFImage from "./DownloadIIIFImage";

describe("DownloadIIIFImage component", () => {
  it("renders without crashing", () => {
    expect(render(<DownloadIIIFImage />));
  });

  //TODO: Add tests here
});
