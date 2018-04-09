import {
  CAROUSEL_ITEMS_REQUEST,
  CAROUSEL_ITEMS_SUCCESS,
  CAROUSEL_ITEMS_FAILURE
} from '../actions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

function items(state = initialState, action) {
  switch (action.type) {
    case CAROUSEL_ITEMS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    case CAROUSEL_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        items: action.items,
        lastUpdated: action.receivedAt
      });
    case CAROUSEL_ITEMS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        items: []
      });
    default:
      return state;
  }
}

export default function carouselReducer(state = {}, action) {
  switch (action.type) {
    case CAROUSEL_ITEMS_REQUEST:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    case CAROUSEL_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    case CAROUSEL_ITEMS_FAILURE:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    default:
      return state;
  }
}
