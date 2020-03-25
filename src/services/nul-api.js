import * as globalVars from "./global-vars";

const cookies = require("cookie");
const nullUser = { token: null };
export const loginKey = "loggedIn";

export function anonymous() {
  return !localStorage.getItem(loginKey);
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
  console.log("cookieStr", cookieStr);
  if (anonymous()) {
    console.log("is anonymous()");
    return nullUser;
  }

  let ssoToken = cookies.parse(cookieStr).openAMssoToken;
  console.log("ssoToken", ssoToken);
  if (ssoToken === null) return nullUser;

  try {
    // SSO request
    const response = await fetch(
      `${globalVars.ELASTICSEARCH_PROXY_BASE}/auth/callback`,
      { headers: { "X-OpenAM-SSO-Token": ssoToken } }
    );
    const { token, user } = await response.json();

    // Current user
    if (token != null) {
      await iiifAuth(token);
      localStorage.setItem("currentUser", user.mail);
      return { token };
    }

    // No current user
    await iiifAuth("");
    localStorage.removeItem(loginKey);
    localStorage.removeItem("currentUser");
    return nullUser;
  } catch (err) {
    console.log("Error in extractApiToken: ", err);
    return Promise.resolve(nullUser);
  }
}
