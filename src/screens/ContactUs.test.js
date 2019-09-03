import React from "react";
import ScreensContactUs from "./ContactUs";
import { renderWithRouter } from "../services/@testing-library-helpers";

jest.mock("../services/google-tag-manager");

test("Component renders", () => {
  const { getByTestId } = renderWithRouter(<ScreensContactUs />);
  expect(getByTestId(/contact-us/)).toBeInTheDocument();
});
