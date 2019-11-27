import React from "react";
import { renderWithRouter } from "../../../services/@testing-library-helpers";
import NavContainer from "./NavContainer";

it("renders NavContainer without crashing", () => {
  expect(renderWithRouter(<NavContainer />)).toBeTruthy();
});
