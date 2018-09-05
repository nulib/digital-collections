import { combineReducers } from 'redux';
import auth from './auth';
import carousels from './carousels';
import collections from './collections';
import search from './search';

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
  auth,
  search
});

export default rootReducer;
