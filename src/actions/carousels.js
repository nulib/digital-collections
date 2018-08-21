import * as actionTypes from './types';
import * as elasticsearchParser from '../services/elasticsearch-parser';
import * as globalVars from '../services/global-vars';
import * as elasticsearchApi from '../api/elasticsearch-api.js';

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
      let elasticsearchResponse = {};
      let modelType = globalVars.COLLECTION_MODEL;

      switch (title) {
        case CAROUSELS.RECENTLY_DIGITIZED_ITEMS:
          elasticsearchResponse = await elasticsearchApi.getRecentlyDigitizedItems();
          modelType = globalVars.IMAGE_MODEL;
          break;
        case CAROUSELS.RECENTLY_DIGITIZED_COLLECTIONS:
          elasticsearchResponse = await elasticsearchApi.getAllCollections();
          break;
        default:
          elasticsearchResponse = await elasticsearchApi.getCollectionsByKeyword(
            title
          );
      }

      if (elasticsearchResponse.error) {
        dispatch(carouselItemsFailure(elasticsearchResponse, title));
        console.log('ERROR');
        return;
      }

      const carouselData = await elasticsearchParser.extractCarouselData(
        elasticsearchResponse,
        modelType // Specify if this is a 'Collection' or 'Image' model
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
