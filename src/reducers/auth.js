import * as actionTypes from '../actions/types';

export default function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_API_TOKEN_SUCCESS:
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
