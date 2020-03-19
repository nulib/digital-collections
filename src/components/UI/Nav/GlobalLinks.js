import React from "react";
import Login from "./Login";

const GlobalLinks = () => {
  return (
    <>
      <li>
        <a
          href="https://www.library.northwestern.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          library.northwestern.edu
        </a>
      </li>
      <Login />
    </>
  );
};

export default GlobalLinks;
