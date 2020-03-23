import React, { useEffect } from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

ScrollToTop.propTypes = {
  children: PropTypes.node
};

export default ScrollToTop;
