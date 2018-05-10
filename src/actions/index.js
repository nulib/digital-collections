import fetch from 'cross-fetch';
import * as actionTypes from './types';
import * as solrParser from '../services/solr-parser';
import CollectionsApi from '../api/collections-api';

const collectionsApi = new CollectionsApi();

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
function carouselItemsRequest(title) {
  // The request started, use this action to show a spinner or loading indicator
  return {
    type: actionTypes.CAROUSEL_ITEMS_REQUEST,
    title
  };
}

function carouselItemsSuccess(payload, title) {
  return {
    type: actionTypes.CAROUSEL_ITEMS_SUCCESS,
    payload,
    title,
    receivedAt: Date.now()
  };
}

function carouselItemsFailure(error, title) {
  return {
    type: actionTypes.CAROUSEL_ITEMS_FAILURE,
    title: title,
    error: error
  };
}

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

export const handleUpdateBodyClass = (bodyClass = 'landing-page') => {
  document.getElementsByTagName('body')[0].setAttribute('class', bodyClass);

  return dispatch => {
    dispatch(updateBodyClass());
  };
};

/*
  Thunk action creators
 */
export const fetchCarouselItems = title => {
  return dispatch => {
    let solrResponse;

    const request = async () => {
      // Determine what we want to retrieve from Solr.  Recently Digitized Items, Collections, a Sub Collection?

      switch (title) {
        case CAROUSELS.RECENTLY_DIGITIZED_ITEMS:
          solrResponse = await collectionsApi.getRecentlyDigitizedItems();
          break;
        case CAROUSELS.RECENTLY_DIGITIZED_COLLECTIONS:
          solrResponse = await collectionsApi.getAllCollections();
          break;
        default:
          console.log('No Solr query type defined');
      }

      // Handle error
      if (solrResponse.error) {
        console.log(solrResponse);
        dispatch(carouselItemsFailure(solrResponse));
        return;
      }

      // Dispatch success action
      const carouselData = await solrParser.extractCarouselData(solrResponse);
      console.log('carouselData', carouselData);

      if (carouselData) {
        dispatch(carouselItemsSuccess(carouselData, title));
      } else {
        dispatch(
          carouselItemsFailure(
            {
              error: true
            },
            title
          )
        );
      }
    };

    dispatch(carouselItemsRequest(title));
    request();
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
