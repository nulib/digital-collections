import React from "react";
import PropTypes from "prop-types";

function ErrorSection({ message = "General error" }) {
  return (
    <div data-testid="error-section" className="error-section">
      Error: {message}
    </div>
  );
}

ErrorSection.propTypes = {
  message: PropTypes.string,
};

export default ErrorSection;
