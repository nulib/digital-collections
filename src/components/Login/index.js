import React from 'react';
import { connect } from 'react-redux';
import withSizes from 'react-sizes';
import { forceLogout } from '../../actions/auth';
import * as nulApi from '../../services/nul-api.js';
import { MOBILE_BREAKPOINT } from '../../services/global-vars';

const Login = props => {
  const authToken = props.authToken || '';
  const styles = {
    link: {
      cursor: 'pointer',
      wordBreak: 'break-word'
    }
  };

  // Not logged in
  if (!authToken) {
    return (
      <li>
        <a href={nulApi.loginLink()} onClick={nulApi.login}>
          Sign in
        </a>
      </li>
    );
  }

  // Logged In
  return (
    <React.Fragment>
      {props.isMobile && (
        <React.Fragment>
          <li>
            <a style={styles.link} onClick={props.forceLogout}>
              {nulApi.currentUser()} - SIGN OUT
            </a>
          </li>
        </React.Fragment>
      )}

      {!props.isMobile && (
        <li>
          {nulApi.currentUser()}
          <span className="dropdown-arrow" />
          <ul>
            <li>
              <a onClick={props.forceLogout}>SIGN OUT</a>
            </li>
          </ul>
        </li>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

const mapDispatchToProps = dispatch => ({
  forceLogout: () => dispatch(forceLogout())
});

const mapSizeToProps = ({ width }) => ({
  isMobile: width <= MOBILE_BREAKPOINT
});

const SizedLogin = withSizes(mapSizeToProps)(Login);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SizedLogin);
