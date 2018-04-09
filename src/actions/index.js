// import MockClient from '../api/client/mock-client';
// const mockClient = new MockClient();
import fetch from 'cross-fetch';

/*
  Action types
 */
export const CAROUSEL_ITEMS_REQUEST = 'CAROUSEL_ITEMS_REQUEST';
export const CAROUSEL_ITEMS_SUCCESS = 'CAROUSEL_ITEMS_SUCCESS';
export const CAROUSEL_ITEMS_FAILURE = 'CAROUSEL_ITEMS_FAILURE';

/*
  Other constants
 */
export const CAROUSELS = {
  RECENTLY_DIGITIZED_ITEMS: 'recentlyDigitizedItems',
  RECENTLY_DIGITIZED_COLLECTIONS: 'recentlyDigitizedCollections',
  PHOTOGRAPHY_COLLECTIONS: 'photographyCollections'
};

/*
  Action creators
 */
function carouselItemsRequest(url, title) {
  // The request started, use this action to show a spinner or loading indicator
  return {
    type: CAROUSEL_ITEMS_REQUEST,
    url,
    title
  };
}

function carouselItemsSuccess(items, title) {
  return {
    type: CAROUSEL_ITEMS_SUCCESS,
    items: items,
    title: title,
    receivedAt: Date.now()
  };
}

function carouselItemsFailure(error, title) {
  return {
    type: CAROUSEL_ITEMS_FAILURE,
    title: title,
    error: error
  };
}

/*
  Thunk action creators
 */
export const fetchCarouselItems = (url, title) => {
  return dispatch => {
    dispatch(carouselItemsRequest(url, title));
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(carouselItemsSuccess(json, title));
        return json;
      })
      .catch(error => dispatch(carouselItemsFailure(error, title)));
  };
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
