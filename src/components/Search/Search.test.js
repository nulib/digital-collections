import React from "react";
import { renderWithReduxAndRouter } from "../../services/@testing-library-helpers";
import Search from "./Search";

jest.mock("../../services/google-tag-manager");

// TODO: Need to figure out how to configure tests to work with ReactiveSearch's custom Provider
xdescribe("Search component", () => {
  it("renders without crashing", () => {
    const { container } = renderWithReduxAndRouter(<Search />);
    expect(container).toBeTruthy();
  });
});
