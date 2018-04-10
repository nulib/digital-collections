import {
  COLLECTIONS_REQUEST,
  COLLECTIONS_SUCCESS,
  COLLECTIONS_FAILURE
} from '../actions';

export default function collections(state = {}, action) {
  switch (action.type) {
    case COLLECTIONS_REQUEST:
      return state;
    case COLLECTIONS_SUCCESS:
      return Object.assign({}, state, {
        items: action.items
      });
    default:
      return state;
  }
}
