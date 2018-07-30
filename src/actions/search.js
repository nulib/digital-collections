import * as actionTypes from './types';
import { getSearchResults } from '../api';

export function searchRequest(searchTerm) {
  return {
    type: actionTypes.SEARCH_REQUEST
  };
}

export function searchSuccess(payload, searchTerm) {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    payload,
    searchTerm
  };
}

export function searchFailure(error, statusText) {
  return {
    type: actionTypes.SEARCH_FAILURE,
    error,
    statusText
  };
}

export const doSearch = searchTerm => {
  return dispatch => {
    const request = async () => {
      let solrResponse = await getSearchResults(searchTerm);

      // Dispatch success action
      dispatch(searchSuccess(solrResponse.response.docs, searchTerm));
    };

    dispatch(searchRequest(searchTerm));
    request();
  };
};
