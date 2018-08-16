import * as actionTypes from './types';
import * as elasticsearchApi from '../api/elasticsearch-api.js';

/*
  Action creators
 */

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

/*
  Thunk action creators
 */
export const fetchCollections = () => {
  return dispatch => {
    const request = async () => {
      let elasticsearchResponse = {};
      elasticsearchResponse = await elasticsearchApi.getAllCollections();

      if (elasticsearchResponse.error) {
        dispatch(collectionsFailure(elasticsearchResponse.error));
        return;
      }
      dispatch(collectionsSuccess(elasticsearchResponse.hits.hits));
    };
    dispatch(collectionsRequest());
    request();
  };
};
