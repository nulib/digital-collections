import React from "react";
import PhotoBox from "./PhotoBox";
import { render, screen } from "@testing-library/react";

describe("Photo box component", () => {
  it("renders", () => {
    render(
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
  });
});
