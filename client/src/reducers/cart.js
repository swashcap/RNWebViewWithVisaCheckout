// @flow
import {
  CART_ITEM_REMOVE,
  CART_ITEM_SAVE_FOR_LATER,
  CART_ITEM_SET_QUANTITY,
} from '../actions/cart';
import type {CartAction} from '../actions/cart';
import values from 'lodash/values';

export type CartItem = {
  id: string,
  imageUri: string,
  name: string,
  price: number,
  quantity: number,
  salePrice?: number,
};

type CartItemMap = {
  +[string]: CartItem,
};

export type CartState = {
  +items: CartItemMap,
  +saveForLater: CartItemMap,
  +total: number,
};

const getTotal = (items: CartItemMap) =>
  values(items).reduce(
    (total, {quantity, price, salePrice}) =>
      total + (salePrice || price) * quantity,
    0
  );

const INITIAL_ITEMS = {
  '1': {
    id: 'abc123',
    imageUri:
      'https://i5.walmartimages.com/asr/119b3443-4fc7-4c3c-8d08-86a3c6f84602_2.01584c522cf3abf387be1b6a0e51ffa0.jpeg?odnWidth=160&odnHeight=160&odnBg=ffffff',
    name: 'Samsung Galaxy S9',
    price: 829.99,
    quantity: 1,
  },
  '2': {
    id: 'def456',
    imageUri:
      'https://i5.walmartimages.com/asr/edb4210b-3cce-445b-8a00-1d111c2ebbfe_1.c7f2f005f63c366d160ff64b94db7f7d.jpeg?odnWidth=160&odnHeight=160&odnBg=ffffff',
    name: 'CoverON Samsung Galaxy S9 Case',
    price: 9.99,
    quantity: 1,
  },
  '3': {
    id: '789abc',
    imageUri:
      'https://i5.walmartimages.com/asr/ed2e3e87-229c-4f23-b8d8-3fdf55d447d9_1.a968fc3df71068fb47fd73438fab0093.jpeg?odnWidth=200&odnHeight=200&odnBg=ffffff',
    name: 'Rayovac Rechargeable AAA Batteries',
    price: 9.99,
    quantity: 2,
    salePrice: 7.8,
  },
  '4': {
    id: '123def',
    imageUri:
      'https://i5.walmartimages.com/asr/36e7b6e7-737f-4675-8b47-561c2e410f4b_1.9e771d4592af8f60f44bb1a34bc0659c.jpeg?odnWidth=160&odnHeight=160&odnBg=ffffff',
    name: 'GimMe Organic Roasted Seaweed Snacks',
    price: 5.95,
    quantity: 4,
  },
};

const INITIAL_STATE = {
  items: INITIAL_ITEMS,
  saveForLater: {},
  total: getTotal(INITIAL_ITEMS),
};

const reducer = (
  state: CartState = INITIAL_STATE,
  {payload, type}: CartAction
): CartState => {
  switch (type) {
    case CART_ITEM_REMOVE: {
      const items = Object.assign({}, state.items);

      delete items[payload.key];

      return {
        items,
        saveForLater: state.saveForLater,
        total: getTotal(items),
      };
    }
    case CART_ITEM_SAVE_FOR_LATER: {
      const items = Object.assign({}, state.items);

      delete items[payload.key];

      return {
        items,
        saveForLater: {
          ...state.saveForLater,
          [payload.key]: state.items[payload.key],
        },
        total: getTotal(items),
      };
    }
    case CART_ITEM_SET_QUANTITY: {
      const items = Object.assign({}, state.items);

      items[payload.key] = Object.assign({}, items[payload.key], {
        quantity: payload.quantity,
      });

      return {
        items,
        saveForLater: state.saveForLater,
        total: getTotal(items),
      };
    }
    default:
      return state;
  }
};

export default reducer;
