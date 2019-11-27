import React from "react";
import { render } from "@testing-library/react";
import { renderWithRouter } from "../../../services/@testing-library-helpers";
import NavContainer from "./NavContainer";

it("renders NavContainer without crashing", () => {
  expect(renderWithRouter(<NavContainer />)).toBeTruthy();
});
