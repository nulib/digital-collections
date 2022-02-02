import React from "react";
import PhotoBox from "./PhotoBox";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "services/@testing-library-helpers";

describe("Photo box component", () => {
  it("renders", () => {
    renderWithRouter(
      <PhotoBox
        key="4dfdfb3b-d533-4757-99eb-f70b5c4c2d9d"
        id="4dfdfb3b-d533-4757-99eb-f70b5c4c2d9d"
        imageUrl="https://iiif.stack.rdc.library.northwestern.edu/iiif/2/72f52fc7-9db8-4c8e-a4d1-fd8ff364cd4d/square/500,500/0/default.jpg"
        label="Towards Self-Government in Nigeria"
        modelName="Image"
        workType="IMAGE"
      />
    );
    expect(screen.getByTestId("photo-box"));
    expect(screen.getByTestId("img-photo-box")).toHaveAttribute("alt");
    expect(screen.getByTestId("title-photo-box")).toHaveTextContent("Nigeria");
    expect(screen.getByTestId("work-type-photo-box")).toHaveTextContent(
      "IMAGE"
    );
  });
});
