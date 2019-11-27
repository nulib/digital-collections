import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCollections } from "../../../api/elasticsearch-api";
import NavSubmenu from "./Submenu";
import { getESTitle } from "../../../services/elasticsearch-parser";

const NavContainer = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections();
  });

  async function getCollections() {
    let response = await getAllCollections();
    let collections = response.hits.hits;

    if (collections && collections.length > 0) {
      setCollections(buildSubmenu(collections));
    }
  }

  function buildSubmenu(items = []) {
    const subMenuItems = items.map(item => {
      return {
        id: item._id,
        url: `/collections/${item._id}`,
        label: getESTitle(item._source)
      };
    });

    return subMenuItems;
  }

  return (
    <nav id="top-nav" aria-label="main navigation menu">
      <div className="contain-1120">
        <ul>
          <li>
            <Link to="/collections">
              Explore Collections
              <span className="dropdown-arrow" />
            </Link>
            <ul className="dropdown-two-column" aria-label="navigation submenu">
              <li>
                <ul data-testid="submenu">
                  <NavSubmenu items={collections} />
                </ul>
              </li>
            </ul>
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
