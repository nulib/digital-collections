import React, { Component } from "react";
import { Link } from "react-router-dom";
import GlobalLinks from "../Nav/GlobalLinks";
import QuickLinksItems from "./QuickLinksItems";
import NavSubmenu from "../Nav/Submenu";
import PropTypes from "prop-types";
import { getESTitle } from "../../../services/elasticsearch-parser";

class MobileNav extends Component {
  static propTypes = {
    closeMenu: PropTypes.func,
    collections: PropTypes.array,
    navOpen: PropTypes.bool,
    quickLinks: PropTypes.array
  };

  state = {
    // Holds the open/close states of mobile subnavigation items (assuming they have children)
    menu: {
      collections: {
        open: true
      }
    }
  };

  buildSubmenu(items = []) {
    const subMenuItems = items.map(item => {
      return {
        id: item._id,
        url: `/collections/${item._id}`,
        label: getESTitle(item._source)
      };
    });

    return subMenuItems;
  }

  /**
   * This function handles closing the mobile navigation when a legit link has been clicked
   */
  handleNavItemClick = e => {
    const {
      menu: {
        collections: { open }
      }
    } = this.state;
    // Check if user clicked or touched the dropdown arrow
    let isArrowButton = e.target.getAttribute("role") === "button";

    // Toggle submenu link items
    if (isArrowButton) {
      this.setState({ menu: { collections: { open: !open } } });
    }

    if (!isArrowButton) {
      this.props.closeMenu(e);
    }
  };

  render() {
    const { collections, navOpen } = this.props;
    const { menu } = this.state;

    return (
      <nav
        id="mobile-nav"
        onClick={this.handleNavItemClick}
        aria-label="mobile menu"
        style={navOpen ? { display: "block" } : { display: "none" }}
      >
        <ul>
          <li tabIndex="0">
            <Link to="/">Explore Collections</Link>
            <span className={`arrow ${menu.collections.open ? "open" : ""}`}>
              {/* eslint-disable-next-line */}
              <a aria-haspopup="true" role="button">
                <span>Expand</span>
                Submenu
              </a>
            </span>
            <ul
              aria-expanded={menu.collections.open}
              aria-hidden={!navOpen}
              style={
                menu.collections.open
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <NavSubmenu items={this.buildSubmenu(collections)} />
            </ul>
          </li>
          <li>
            <Link to="/search">Browse Items</Link>
          </li>
        </ul>
        <div id="mobile-nav-bottom">
          {/* from #global-links */}
          <ul id="mobile-nav-bottom-left">
            <QuickLinksItems quickLinks={this.props.quickLinks} />
            <GlobalLinks />
          </ul>
        </div>
      </nav>
    );
  }
}

export default MobileNav;
