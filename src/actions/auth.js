import * as actionTypes from './types';
import * as nulApi from '../services/nul-api.js';

export function fetchApiTokenSuccess(payload) {
  return {
    type: actionTypes.FETCH_API_TOKEN_SUCCESS,
    payload
  };
}

export function forceLogout() {
  return dispatch => {
    nulApi.logout();
    dispatch({
      type: actionTypes.LOGOUT_SUCCESS,
      payload: { token: null }
    });
  };
}

export const fetchApiToken = () => {
  const cookie = document.cookie;

  return dispatch => {
    const request = async () => {
      let response = await nulApi.extractApiToken(cookie);

      // Dispatch success action
      dispatch(fetchApiTokenSuccess(response));
    };
    request();
  };
};
