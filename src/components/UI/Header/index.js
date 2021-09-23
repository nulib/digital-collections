import React from "react";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import QuickLinks from "./QuickLinks";
import MobileLinks from "./MobileLinks";

const quickLinks = [
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Contact Us",
    url: "/contact-us",
  },
];

const Header = () => {
  return (
    <header>
      <a href="smain-content" className="screen-reader-shortcut">
        Skip to main content
      </a>
      <TopBar />
      <QuickLinks quickLinks={quickLinks} />
      <BottomBar />
      <MobileLinks quickLinks={quickLinks} />
    </header>
  );
};

export default Header;
