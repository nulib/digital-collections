import fetch from 'cross-fetch';
import * as actionTypes from './types';
import * as solrParser from '../services/solr-parser';
import * as globalVars from '../services/global-vars';
import Api from '../api';

const api = new Api();

/*
  Other constants
 */
// TODO: Move this to global vars
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

function carouselItemsFailure(errorObj, title) {
  return {
    type: actionTypes.CAROUSEL_ITEMS_FAILURE,
    error: errorObj,
    title: title
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
    const request = async () => {
      // Determine what we want to retrieve from Solr.  Recently Digitized Items, Collections, a Sub Collection?
      let solrResponse;
      let modelType;

      switch (title) {
        case CAROUSELS.RECENTLY_DIGITIZED_ITEMS:
          solrResponse = await api.getRecentlyDigitizedItems();
          modelType = globalVars.IMAGE;
          break;
        case CAROUSELS.RECENTLY_DIGITIZED_COLLECTIONS:
          solrResponse = await api.getAllCollections();
          modelType = globalVars.COLLECTION;
          console.log('Collections solrResponse', solrResponse);
          break;
        default:
          console.log('No Solr query type defined');
      }

      // Handle error
      if (solrResponse.error) {
        console.log(solrResponse);
        dispatch(carouselItemsFailure(solrResponse, title));
        return;
      }

      const carouselData = await solrParser.extractCarouselData(
        solrResponse,
        modelType // Specify if this is a 'Collection' or 'Image' model we're grabbing Solr data for
      );
      console.log('carouselData', carouselData);

      if (carouselData) {
        // Dispatch success action
        dispatch(carouselItemsSuccess(carouselData, title));
      } else {
        // Handle error
        dispatch(
          carouselItemsFailure(
            {
              error: true,
              statusText:
                'Error in actions creator.  No carouselData returned from Solr parser.'
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
