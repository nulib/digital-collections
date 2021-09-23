import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { renderWithRouter } from "../../../services/@testing-library-helpers";

test("Breadcrumbs displays correct amount of crumbs", () => {
  let crumbs = [
    { title: "Crumb1", link: "/crumb1" },
    { title: "Crumb2", link: "/crumb2" },
  ];
  const { getByTestId, debug } = renderWithRouter(
    <Breadcrumbs items={crumbs} />
  );

  expect(getByTestId(/breadcrumbs/)).toBeInTheDocument();
  expect(getByTestId(/breadcrumbs/).children.length).toEqual(2);
});

test("Breadcrumbs do not display if no items passed in", () => {
  const { queryByTestId } = renderWithRouter(<Breadcrumbs />);
  expect(queryByTestId(/breadcrumbs/)).not.toBeInTheDocument();
});

test("All breadcrumbs have links except the final breadcrumb", () => {
  let crumbs = [
    { title: "Crumb1", link: "/crumb1" },
    { title: "Crumb2", link: "/crumb2" },
  ];
  const { container, getByTestId, debug } = renderWithRouter(
    <Breadcrumbs items={crumbs} />
  );
  expect(container.querySelectorAll("a").length).toEqual(crumbs.length - 1);
  expect(
    getByTestId(/breadcrumbs/).lastChild.querySelectorAll("a").length
  ).toEqual(0);
});
