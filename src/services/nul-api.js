import * as globalVars from '../services/global-vars';
import Honeybadger from 'honeybadger-js';

const cookies = require('cookie');
const nullUser = { token: null };
const loginKey = 'loggedIn';

export function anonymous() {
  return !localStorage.getItem(loginKey);
}

export function currentUser() {
  if (anonymous()) {
    return null;
  } else {
    return localStorage.getItem('currentUser');
  }
}

export function login() {
  localStorage.setItem(loginKey, 'true');
}

export function logout() {
  localStorage.removeItem(loginKey);
  localStorage.removeItem('currentUser');
  Honeybadger.resetContext();
}

export function loginLink() {
  return `${globalVars.ELASTICSEARCH_PROXY_BASE}/auth/login`;
}

async function asyncExtractApiToken(cookieStr) {
  return new Promise((resolve, reject) => {
    if (anonymous()) {
      resolve(nullUser);
    }

    let ssoToken = cookies.parse(cookieStr).openAMssoToken;
    if (ssoToken != null) {
      fetch(`${globalVars.ELASTICSEARCH_PROXY_BASE}/auth/callback`, {
        headers: { 'X-OpenAM-SSO-Token': ssoToken }
      })
        .then(response => {
          response
            .json()
            .then(data => {
              Honeybadger.resetContext({
                user_id: data.user.uid,
                user_email: data.user.mail
              });
              localStorage.setItem('currentUser', data.user.mail);
              resolve({ token: data.token });
            })
            .catch(err => {
              Honeybadger.notify(err);
              resolve(nullUser);
            });
        })
        .catch(err => {
          Honeybadger.notify(err);
          console.debug('Error: ', err);
          resolve(nullUser);
        });
    } else {
      resolve(nullUser);
    }
  });
}

export const extractApiToken = Honeybadger.wrap(asyncExtractApiToken);
