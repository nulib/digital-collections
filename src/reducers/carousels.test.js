import reducer from './carousels';
import * as types from '../actions/types';

describe('Carousels reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle CAROUSEL_ITEMS_REQUEST', () => {
    const title = 'myItems';
    const response = reducer(undefined, {
      type: types.CAROUSEL_ITEMS_REQUEST,
      title
    });
    expect(response).toEqual({
      [title]: {
        items: [],
        loading: true,
        error: false
      }
    });
  });

  it('should handle CAROUSEL_ITEMS_SUCCESS', () => {
    const title = 'allCarousels';
    const receivedAt = '2018-05-20';
    const numFound = 4;

    const response = reducer(undefined, {
      type: types.CAROUSEL_ITEMS_SUCCESS,
      title,
      receivedAt,
      numFound
    });
    expect(response).toEqual({
      [title]: {
        loading: false,
        error: false,
        items: [],
        lastUpdated: receivedAt,
        numFound: 4
      }
    });
  });

  it('should handle CAROUSEL_ITEMS_SUCCESS and a payload', () => {
    const title = 'recentlyDigitizedItems';
    const receivedAt = '2018-05-20';
    const numFound = 4;
    const items = [
      {
        foo: 'bar'
      },
      {
        yo: 'yo'
      }
    ];
    const payload = { items };
    const response = reducer(undefined, {
      type: types.CAROUSEL_ITEMS_SUCCESS,
      numFound,
      payload,
      receivedAt,
      title
    });
    expect(response).toEqual({
      [title]: {
        loading: false,
        error: false,
        items,
        lastUpdated: receivedAt,
        numFound: 4
      }
    });
  });

  it('should handle CAROUSEL_ITEMS_FAILURE', () => {
    const title = 'recentlyDigitizedItems';
    const error = {
      statusText: 'There was an error',
      url: 'http://theurlwhichgaveanerror.com/'
    };
    const response = reducer(undefined, {
      type: types.CAROUSEL_ITEMS_FAILURE,
      error,
      title
    });
    expect(response).toEqual({
      [title]: {
        loading: false,
        error,
        items: []
      }
    });
  });
});
