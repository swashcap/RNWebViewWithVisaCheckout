// @flow
export type CartItemRemoveAction = {|
  payload: {
    key: string,
  },
  type: 'CART_ITEM_REMOVE',
|};

export const CART_ITEM_REMOVE = 'CART_ITEM_REMOVE';

export const remove = (key: string): CartItemRemoveAction => ({
  payload: {key},
  type: CART_ITEM_REMOVE,
});

export type CartItemSaveForLaterAction = {|
  payload: {
    key: string,
  },
  type: 'CART_ITEM_SAVE_FOR_LATER',
|};

export const CART_ITEM_SAVE_FOR_LATER = 'CART_ITEM_SAVE_FOR_LATER';

export const saveForLater = (key: string): CartItemSaveForLaterAction => ({
  payload: {key},
  type: CART_ITEM_SAVE_FOR_LATER,
});

export type CartItemSetQuantityAction = {|
  payload: {
    key: string,
    quantity: number,
  },
  type: 'CART_ITEM_SET_QUANTITY',
|};

export const CART_ITEM_SET_QUANTITY = 'CART_ITEM_SET_QUANTITY';

export const setQuantity = (
  key: string,
  quantity: number
): CartItemSetQuantityAction => ({
  payload: {key, quantity},
  type: CART_ITEM_SET_QUANTITY,
});

export type CartAction =
  | CartItemRemoveAction
  | CartItemSaveForLaterAction
  | CartItemSetQuantityAction;
