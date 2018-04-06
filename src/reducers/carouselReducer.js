import {
  FETCH_CAROUSEL_ITEMS_REQUEST,
  FETCH_CAROUSEL_ITEMS_SUCCESS
} from '../actions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

function items(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAROUSEL_ITEMS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    case FETCH_CAROUSEL_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        items: action.items,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

export default function carouselReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CAROUSEL_ITEMS_REQUEST:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    case FETCH_CAROUSEL_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        [action.title]: items(state[action.title], action)
      });
    default:
      return state;
  }
}
