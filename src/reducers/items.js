// @flow
import {ITEMS_REMOVE, ITEMS_SET_QUANTITY} from '../actions/items';
import type {ItemsAction} from '../actions/items';

type Item = {
  id: string,
  imageUri: string,
  name: string,
  price: number,
  quantity: number,
  salePrice?: number,
};

type ItemsState = {
  [string]: Item,
};

const INITIAL_STATE = {};

const reducer = (
  state: ItemsState = INITIAL_STATE,
  action: ItemsAction
): ItemsState => {
  switch (action.type) {
    case ITEMS_SET_QUANTITY:
      return state;
    case ITEMS_REMOVE:
      return state;
    default:
      return state;
  }
};

export default reducer;
