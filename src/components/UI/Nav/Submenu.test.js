import React from "react";
import { renderWithRouter } from "../../../services/@testing-library-helpers";
import NavSubmenu from "./Submenu";

const subMenuItems = [
  {
    id: "abc124",
    label: "Ima label",
    url: "/testing1"
  },
  {
    id: "def877",
    label: "Second label",
    url: "/book-of-john"
  },
  {
    id: "8uudhdd",
    label: "Another label",
    url: "/tickets"
  }
];

describe("NavSubmenu component", () => {
  it("renders without crashing", () => {
    expect(renderWithRouter(<NavSubmenu />)).toBeTruthy();
  });

  it("renders correct amount of submenu items", () => {
    const { container } = renderWithRouter(<NavSubmenu items={subMenuItems} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toEqual(3);
  });

  it("renders a submenu item link and label correctly", () => {
    const { container } = renderWithRouter(<NavSubmenu items={subMenuItems} />);
    const listItems = container.querySelectorAll("li");
    const a = listItems[0].querySelector("a");

    expect(a.innerHTML).toEqual(subMenuItems[0].label);
    expect(a.getAttribute("href")).toEqual(subMenuItems[0].url);
  });
});
