import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forceLogout } from '../../actions/auth';
import * as nulApi from '../../services/nul-api.js';

const Login = props => {
  const authToken = props.authToken || '';
  let loginText;
  const loginClick = () => nulApi.login();
  const logoutClick = () => props.forceLogout();
  const styles = {
    link: {
      cursor: 'pointer'
    }
  };

  const renderLoginText = () => {
    if (authToken === '') {
      return (
        <a href={nulApi.loginLink()} onClick={loginClick}>
          Sign in
        </a>
      );
    }

    return (
      <div style={styles.link}>
        {nulApi.currentUser()}
        <span className="dropdown-arrow" />
        <ul>
          <li>
            <a onClick={logoutClick}>SIGN OUT</a>
          </li>
        </ul>
      </div>
    );
  };

  return renderLoginText();
};

const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

const mapDispatchToProps = dispatch => ({
  forceLogout: () => dispatch(forceLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
