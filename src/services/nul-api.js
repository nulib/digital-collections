import * as globalVars from "./global-vars";
import "whatwg-fetch";

const cookies = require("cookie");
const nullUser = { token: null };
export const loginKey = "loggedIn";

export function anonymous() {
  try {
    return !localStorage.getItem(loginKey);
  } catch (e) {
    return true;
  }
}

export function currentUser() {
  if (anonymous()) {
    return null;
  } else {
    return localStorage.getItem("currentUser");
  }
}

export function login() {
  localStorage.setItem(loginKey, "true");
}

export function logout() {
  localStorage.removeItem(loginKey);
  localStorage.removeItem("currentUser");
  iiifAuth("");
}

export function loginLink() {
  return `${globalVars.ELASTICSEARCH_PROXY_BASE}/auth/login`;
}

async function iiifAuth(token) {
  if (globalVars.IIIF_LOGIN_URL) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", globalVars.IIIF_LOGIN_URL);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    await xhr.send();
  }
  return true;
}

export async function extractApiToken(cookieStr) {
  if (anonymous()) {
    return nullUser;
  }

  let token = cookies.parse(cookieStr).dcApiToken;
  let user = cookies.parse(cookieStr).dcApiUser;

  if (token === null) return nullUser;

  try {
    // Current user
    if (token != null) {
      await iiifAuth(token);
      localStorage.setItem("currentUser", user);
      return { token };
    }

    // No current user
    await iiifAuth("");
    localStorage.removeItem(loginKey);
    localStorage.removeItem("currentUser");
    return nullUser;
  } catch (err) {
    console.log("Error in extractApiToken: ", err);
    return nullUser;
  }
}
