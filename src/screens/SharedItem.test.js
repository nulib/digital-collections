import React from "react";
import { render } from "@testing-library/react";
import { renderWithRouter } from "../services/@testing-library-helpers";
import { Route } from "react-router-dom";
import ScreensSharedItem from "./SharedItem";

describe("ScreensSharedItem component", () => {
  function setupTest() {
    return renderWithRouter(
      <Route path="/shared/:sharedLinkId" component={ScreensSharedItem} />,
      { route: "/shared/abc123" }
    );
  }
  it("renders the component", () => {
    const { getByTestId } = setupTest();
    expect(getByTestId("shared-item-container")).toBeInTheDocument();
  });

  it("displays an error message when a fetch Error occurs", () => {
    const { queryByTestId } = setupTest();
    expect(queryByTestId("notification-error")).toBeNull();

    // TODO: Figure out how to mimic an error in the test
  });
});
