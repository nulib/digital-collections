import MockClient from '../api/client/mock-client';
const mockClient = new MockClient();

/*
  Action types
 */
export const FETCH_CAROUSEL_ITEMS_REQUEST = 'FETCH_CAROUSEL_ITEMS_REQUEST';
export const FETCH_CAROUSEL_ITEMS_SUCCESS = 'FETCH_CAROUSEL_ITEMS_SUCCESS';
export const FETCH_CAROUSEL_ITEMS_FAILURE = 'FETCH_CAROUSEL_ITEMS_FAILURE';

/*
  Other constants
 */
export const CAROUSELS = {
  RECENTLY_DIGITIZED_ITEMS: 'recentlyDigitizedItems',
  RECENTLY_DIGITIZED_COLLECTIONS: 'recentlyDigitizedCollections',
  PHOTOGRAPHY_COLLECTIONS: 'photographyCollections'
};

export const fetchCarouselItems = (url, title) => {
  return dispatch => {
    dispatch(fetchCarouselItemsRequest(url, title));
    return mockClient
      .getData(url)
      .then(response => {
        dispatch(fetchCarouselItemsSuccess(response, title));
      })
      .catch(error => console.log('error', error));
  };
};

/*
  Action creators
 */
function fetchCarouselItemsRequest(url, title) {
  return {
    type: FETCH_CAROUSEL_ITEMS_REQUEST,
    url,
    title
  };
}

function fetchCarouselItemsSuccess(items, title) {
  return {
    type: FETCH_CAROUSEL_ITEMS_SUCCESS,
    items: items,
    title: title,
    receivedAt: Date.now()
  };
}
