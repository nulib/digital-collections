import { combineReducers } from 'redux';
import carousels from './carousels';
import collections from './collections';
import * as actionTypes from '../actions/types';

const general = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BODY_CLASS:
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
