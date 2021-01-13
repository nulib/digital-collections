import React from "react";
import PropTypes from "prop-types";

function ErrorSection({ children }) {
  return (
    <div role="alert" data-testid="error-section" className="error-section">
      {children}
    </div>
  );
}

ErrorSection.propTypes = {
  children: PropTypes.node,
};

export default ErrorSection;
