import React from "react";
import SharedItem from "./SharedItem";
import { renderWithReduxAndRouter } from "../../services/@testing-library-helpers";
import { screen } from "@testing-library/react";
import { mockWork } from "testing-helpers/mock-work";
import { mockWorkVideo } from "testing-helpers/mock-work-video";

describe("SharedItem component", () => {
  it("renders without crashing", async () => {
    renderWithReduxAndRouter(<SharedItem work={mockWork} />);
    const el = await screen.findByTestId("shared-item");
    expect(el);
  });

  it("renders the OpenSeadragon Viewer for an Image work", async () => {
    renderWithReduxAndRouter(<SharedItem work={mockWork} />);
    const el = await screen.findByTestId("section-open-seadragon");
    expect(el);
  });

  it("renders the React Media Player for a Video work", async () => {
    renderWithReduxAndRouter(<SharedItem work={mockWorkVideo} />);
    const el = await screen.findByTestId("media-player-wrapper");
    expect(el);
  });

  it("renders a Work component", async () => {
    renderWithReduxAndRouter(<SharedItem work={mockWork} />);
    const el = await screen.findByTestId("work-component");
    expect(el);
  });
});
