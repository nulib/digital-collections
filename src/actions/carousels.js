import * as actionTypes from './types';
import * as solrParser from '../services/solr-parser';
import * as globalVars from '../services/global-vars';
import Api from '../api';

const api = new Api();

export const CAROUSELS = {
  RECENTLY_DIGITIZED_ITEMS: 'recentlyDigitizedItems',
  RECENTLY_DIGITIZED_COLLECTIONS: 'recentlyDigitizedCollections',
  PHOTOGRAPHY_COLLECTIONS: 'photographyCollections'
};

export function carouselItemsRequest(title) {
  // The request started, use this action to show a spinner or loading indicator
  return {
    type: actionTypes.CAROUSEL_ITEMS_REQUEST,
    title
  };
}

export function carouselItemsSuccess(payload, title) {
  return {
    type: actionTypes.CAROUSEL_ITEMS_SUCCESS,
    payload,
    title,
    receivedAt: Date.now()
  };
}

export function carouselItemsFailure(errorObj, title) {
  return {
    type: actionTypes.CAROUSEL_ITEMS_FAILURE,
    error: errorObj,
    title: title
  };
}

/*
  Thunk action creators
 */
export const fetchCarouselItems = title => {
  return dispatch => {
    const request = async () => {
      // Determine what we want to retrieve from Solr.  Recently Digitized Items, Collections, a Sub Collection?
      let solrResponse = {};
      let modelType = globalVars.COLLECTION;

      switch (title) {
        case CAROUSELS.RECENTLY_DIGITIZED_ITEMS:
          solrResponse = await api.getRecentlyDigitizedItems();
          modelType = globalVars.IMAGE;
          break;
        case CAROUSELS.RECENTLY_DIGITIZED_COLLECTIONS:
          solrResponse = await api.getAllCollections();
          break;
        default:
          solrResponse = await api.getCollections(title);
      }

      // Handle error
      if (solrResponse.error) {
        dispatch(carouselItemsFailure(solrResponse, title));
        return;
      }

      const carouselData = await solrParser.extractCarouselData(
        solrResponse,
        modelType // Specify if this is a 'Collection' or 'Image' model we're grabbing Solr data for
      );

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
