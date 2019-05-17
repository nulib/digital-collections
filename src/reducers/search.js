import * as actionTypes from '../actions/types';

export default function search(state = {}, action) {
  switch (action.type) {
    case actionTypes.SEARCH_VALUE_CHANGE:
      return Object.assign({}, state, { searchValue: action.value });
    default:
      return state;
  }
}
