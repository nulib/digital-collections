import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DownloadIIIFImage from "./DownloadIIIFImage";

describe("DownloadIIIFImage component", () => {
  it("renders the download button", () => {
    const { getByTestId } = render(
      <DownloadIIIFImage
        imageUrl="https://foobar.com/image"
        imageTitle="ima-image"
      />
    );
    expect(getByTestId("download-button")).toBeInTheDocument();
  });
});
