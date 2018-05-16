import * as actions from './carousels';
import * as types from './types';

describe('Carousel actions', () => {
  it('should create an action to request carousel items', () => {
    const title = 'My items';
    const expectedAction = {
      type: types.CAROUSEL_ITEMS_REQUEST,
      title
    };
    expect(actions.carouselItemsRequest(title)).toEqual(expectedAction);
  });

  it('should create an action for carousel items request success', () => {
    let payload = {};
    payload.items = [{ foo: 'bar' }];
    const title = 'My items';
    const expectedAction = {
      type: types.CAROUSEL_ITEMS_SUCCESS,
      payload,
      title
    };
    const returnedAction = actions.carouselItemsSuccess(payload, title);

    expect(returnedAction.payload).toEqual(payload);
    expect(Array.isArray(returnedAction.payload.items)).toBeTruthy();
    expect(returnedAction.title).toEqual(title);
    expect(returnedAction.receivedAt).toBeDefined();
  });

  it('should create an action for failed carousel items request', () => {
    const errorObj = { error: true, statusText: 'An error happened' };
    const title = 'My title';
    const expectedAction = {
      type: types.CAROUSEL_ITEMS_FAILURE,
      error: errorObj,
      title
    };
    expect(actions.carouselItemsFailure(errorObj, title)).toEqual(
      expectedAction
    );
  });
});
