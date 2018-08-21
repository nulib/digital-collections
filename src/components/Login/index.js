import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forceLogout } from '../../actions/auth';
import * as nulApi from '../../services/nul-api.js';

class Login extends Component {
  render() {
    const authToken = this.props.authToken || '';

    const loginClick = () => nulApi.login();
    const logoutClick = () => this.props.forceLogout();

    var loginText;
    if (authToken === '') {
      loginText = (
        <a href={nulApi.loginLink()} onClick={loginClick}>
          Sign in
        </a>
      );
    } else {
      loginText = (
        <li className="resources">
          {nulApi.currentUser()}
          <span className="dropdown-arrow" />
          <ul>
            <li>
              <button onClick={logoutClick}>
                <strong>SIGN OUT</strong>
              </button>
            </li>
          </ul>
        </li>
      );
    }

    return <span>{loginText}</span>;
  }
}

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
