import * as actionTypes from '../actions/types';

const initialState = {
  open: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return Object.assign({}, state, {});
    case actionTypes.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        results: action.payload,
        searchTerm: action.searchTerm
      });
    case actionTypes.SEARCH_TOGGLE:
      return Object.assign({}, state, {
        open: !state.open
      });
    default:
      return state;
  }
}
