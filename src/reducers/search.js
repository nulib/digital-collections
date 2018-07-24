import * as actionTypes from '../actions/types';

export default function search(state = {}, action) {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return Object.assign({}, state, {});
    case actionTypes.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        results: action.payload,
        searchTerm: action.searchTerm
      });
    default:
      return state;
  }
}
