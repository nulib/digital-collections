import * as actionTypes from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null
};

function items(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CAROUSEL_ITEMS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    case actionTypes.CAROUSEL_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        items: action.payload ? action.payload.items : [],
        lastUpdated: action.receivedAt,
        numFound: action.numFound
      });
    case actionTypes.CAROUSEL_ITEMS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        items: []
      });
    default:
      return state;
  }
}

export default function carousels(state = {}, action) {
  switch (action.type) {
    case actionTypes.CAROUSEL_ITEMS_REQUEST:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    case actionTypes.CAROUSEL_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    case actionTypes.CAROUSEL_ITEMS_FAILURE:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    default:
      return state;
  }
}
