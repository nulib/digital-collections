import React from "react";
import { Link } from "react-router-dom";

const NavContainer = () => {
  return (
    <nav id="top-nav" aria-label="main navigation menu">
      <div className="contain-1120">
        <ul>
          <li>
            <Link to="/collections">Explore Collections</Link>
          </li>
          <li>
            <Link to="/search">Browse Items</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavContainer;
