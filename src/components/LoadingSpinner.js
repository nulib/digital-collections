import React from 'react';
import { BarLoader } from 'react-spinners';
import { css } from 'react-emotion';
import PropTypes from 'prop-types';

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingSpinner = props => {
  return (
    <BarLoader className={override} color={'#4e2a84'} loading={props.loading} />
  );
};

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
  padding: PropTypes.bool
};

export default LoadingSpinner;
