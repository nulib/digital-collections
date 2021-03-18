import React from "react";
import SharedItem from "./SharedItem";
import { renderWithReduxAndRouter } from "../../services/@testing-library-helpers";
import { mockWork } from "../../testing-helpers/mock-work";

xdescribe("SharedItem component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <SharedItem work={mockWork} />
    );
    expect(getByTestId("shared-item"));
  });

  it("renders the OpenSeadragon Viewer", () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <SharedItem work={mockWork} />
    );
    expect(getByTestId("section-open-seadragon"));
  });

  it("renders a Work component", () => {
    const { getByTestId } = renderWithReduxAndRouter(
      <SharedItem work={mockWork} />
    );
    expect(getByTestId("work-component"));
  });
});
