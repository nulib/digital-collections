import { combineReducers } from 'redux';
import carousels from './carousels';
import collections from './collections';
import { UPDATE_BODY_CLASS } from '../actions';

const general = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BODY_CLASS:
      return Object.assign({}, state, {
        bodyClass: action.bodyClass
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  general,
  carousels,
  collections
});

export default rootReducer;
