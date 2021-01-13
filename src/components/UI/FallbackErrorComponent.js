import React from "react";
import PropTypes from "prop-types";
import ErrorSection from "components/UI/ErrorSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function FallbackErrorComponent({ error }) {
  return (
    <ErrorSection>
      <p>
        <FontAwesomeIcon icon="exclamation-triangle" /> Error loading content:{" "}
        <pre>{error.message}</pre>
      </p>
    </ErrorSection>
  );
}

FallbackErrorComponent.propTypes = {
  error: PropTypes.object,
};

export default FallbackErrorComponent;
