import React from "react";
import SharedItem from "./SharedItem";
import { render } from "@testing-library/react";
import { mockWork } from "../../testing-helpers/mock-work";

describe("SharedItem component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<SharedItem work={mockWork} />);
    expect(getByTestId("shared-item"));
  });

  it("renders the OpenSeadragon Viewer", () => {
    const { getByTestId } = render(<SharedItem work={mockWork} />);
    expect(getByTestId("section-open-seadragon"));
  });

  it("renders a Work component", () => {
    const { getByTestId } = render(<SharedItem work={mockWork} />);
    expect(getByTestId("work-component"));
  });
});
