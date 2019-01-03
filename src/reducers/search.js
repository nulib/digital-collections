import * as actionTypes from '../actions/types';

const initialState = {
  open: false
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_TOGGLE:
      return Object.assign({}, state, {
        open: !state.open
      });
    default:
      return state;
  }
}
