import fetch from 'cross-fetch';
import * as actionTypes from './types';

/*
  Action creators
 */

function updateBodyClass(bodyClass) {
  return {
    type: actionTypes.UPDATE_BODY_CLASS,
    bodyClass
  };
}

function collectionsRequest() {
  return {
    type: actionTypes.COLLECTIONS_REQUEST
  };
}

function collectionsSuccess(items) {
  return {
    type: actionTypes.COLLECTIONS_SUCCESS,
    items: items,
    receivedAt: Date.now()
  };
}

function collectionsFailure(error) {
  return {
    type: actionTypes.COLLECTIONS_FAILURE,
    error: error
  };
}

// TODO: Move this out of Redux into a helper service
export const handleUpdateBodyClass = (bodyClass = 'landing-page') => {
  document.getElementsByTagName('body')[0].setAttribute('class', bodyClass);

  return dispatch => {
    dispatch(updateBodyClass());
  };
};

/*
  Thunk action creators
 */
export const fetchCollections = () => {
  return dispatch => {
    dispatch(collectionsRequest());
    return fetch('/json/mock/all-collections.js')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(collectionsSuccess(json));
        return json;
      })
      .catch(error => dispatch(collectionsFailure(error)));
  };
};

/**
 * Helper functions
 */

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
