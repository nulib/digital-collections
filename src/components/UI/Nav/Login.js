import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { forceLogout } from "../../../actions/auth";
import * as nulApi from "../../../services/nul-api.js";
import { useLocation, useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const authToken = useSelector((state) => state.auth.token);
  const styles = {
    link: {
      cursor: "pointer",
      wordBreak: "break-word",
    },
    subNavLink: {
      display: "inline-block",
    },
  };

  const handleLogout = () => {
    dispatch(forceLogout());

    try {
      // Current screen is either Collection landing, or Work
      // On logout, gracefully route back to homepage instead of an
      // unauthorized message
      const pathnameArray = location.pathname.slice(1).split("/");
      const isCollectionScreen =
        pathnameArray[0] === "collections" && pathnameArray[1];
      const isItems = pathnameArray[0] === "items";

      if (isCollectionScreen || isItems) {
        history.push("/");
      }

      // Collection list screen.  Reload the page
      if (pathnameArray[0] === "collections" && !pathnameArray[1]) {
        window.location.reload(false);
      }
    } catch (error) {
      console.log("Error in handleLogout in Login.js: ", error);
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
                onClick={handleLogout}
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
