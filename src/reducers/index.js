import { combineReducers } from 'redux';
import auth from './auth';
import carousels from './carousels';
import collections from './collections';

const general = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  general,
  carousels,
  collections,
  auth
});

export default rootReducer;
