import { combineReducers } from 'redux';
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
  search
});

export default rootReducer;
