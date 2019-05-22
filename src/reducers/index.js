import { combineReducers } from 'redux';
import auth from './auth';
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
  collections,
  auth,
  search
});

export default rootReducer;
