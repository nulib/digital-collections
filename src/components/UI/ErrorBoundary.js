import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorSection from "./ErrorSection";

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };

  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service here?
    console.log("Error", error);
    console.log("Error info", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <ErrorSection message="Oooops...something went wrong" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
