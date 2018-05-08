import * as actionTypes from '../actions/types';

export default function collections(state = {}, action) {
  switch (action.type) {
    case actionTypes.COLLECTIONS_REQUEST:
      return state;
    case actionTypes.COLLECTIONS_SUCCESS:
      return Object.assign({}, state, {
        items: action.items
      });
    case actionTypes.COLLECTIONS_FAILURE:
      return state;
    default:
      return state;
  }
}
