import React from "react";
import BarLoader from "react-spinners/BarLoader";
import PropTypes from "prop-types";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const override = css`
  margin: 20px auto;
`;

const LoadingSpinner = (props) => {
  return <BarLoader css={override} color={"#4e2a84"} loading={props.loading} />;
};

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingSpinner;
