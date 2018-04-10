import fetch from 'cross-fetch';

/*
  Action types
 */
export const CAROUSEL_ITEMS_REQUEST = 'CAROUSEL_ITEMS_REQUEST';
export const CAROUSEL_ITEMS_SUCCESS = 'CAROUSEL_ITEMS_SUCCESS';
export const CAROUSEL_ITEMS_FAILURE = 'CAROUSEL_ITEMS_FAILURE';
export const UPDATE_BODY_CLASS = 'UPDATE_BODY_CLASS';
export const COLLECTIONS_REQUEST = 'COLLECTIONS_REQUEST';
export const COLLECTIONS_SUCCESS = 'COLLECTIONS_SUCCESS';
export const COLLECTIONS_FAILURE = 'COLLECTIONS_FAILURE';

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

function updateBodyClass(bodyClass) {
  return {
    type: UPDATE_BODY_CLASS,
    bodyClass
  };
}

function collectionsRequest() {
  return {
    type: COLLECTIONS_REQUEST
  };
}

function collectionsSuccess(items) {
  return {
    type: COLLECTIONS_SUCCESS,
    items: items,
    receivedAt: Date.now()
  };
}

function collectionsFailure(error) {
  return {
    type: COLLECTIONS_FAILURE,
    error: error
  };
}

export const handleUpdateBodyClass = (bodyClass = 'landing-page') => {
  document.getElementsByTagName('body')[0].setAttribute('class', bodyClass);

  return dispatch => {
    dispatch(updateBodyClass());
  };
};

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

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
