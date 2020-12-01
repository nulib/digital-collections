import React from "react";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

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
