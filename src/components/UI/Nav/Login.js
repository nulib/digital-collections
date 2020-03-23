import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { forceLogout } from "../../../actions/auth";
import * as nulApi from "../../../services/nul-api.js";

const Login = () => {
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.token);
  const styles = {
    link: {
      cursor: "pointer",
      wordBreak: "break-word"
    },
    subNavLink: {
      display: "inline-block"
    }
  };

  // Not logged in
  if (!authToken) {
    return (
      <li>
        <a
          href={nulApi.loginLink()}
          onClick={nulApi.login}
          data-testid="sign-in"
        >
          Sign in
        </a>
      </li>
    );
  }

  // Logged In
  return (
    <>
      {isMobile && (
        <li>
          <button
            style={styles.link}
            className="button-link"
            onClick={() => dispatch(forceLogout())}
          >
            {nulApi.currentUser()} - SIGN OUT
          </button>
        </li>
      )}

      {!isMobile && (
        <li style={styles.link}>
          {nulApi.currentUser()}
          <span className="dropdown-arrow" />
          <ul>
            <li>
              <button
                style={styles.subNavLink}
                className="button-link"
                onClick={() => dispatch(forceLogout())}
              >
                SIGN OUT
              </button>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};

export default Login;
