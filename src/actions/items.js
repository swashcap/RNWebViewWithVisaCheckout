type ItemsActionSetQuantity = {
  payload: number,
  type: 'ITEMS_SET_QUANTITY',
};

export const ITEMS_SET_QUANTITY = 'ITEMS_SET_QUANTITY';

export const setQuantity = (
  key: string,
  quantity: number
): ItemsActionSetQuantity => ({
  payload: {
    key,
    quantity,
  },
  type: ITEMS_SET_QUANTITY,
});

type ItemsActionRemove = {
  payload: {
    key: string,
  },
  type: 'ITEMS_REMOVE',
};

export const ITEMS_REMOVE = 'ITEMS_REMOVE';

export const remove = (key: string): ItemsActionRemove => ({
  payload: {key},
  type: ITEMS_REMOVE,
});

export type ItemsAction = ItemsActionSetQuantity | ItemsActionRemove;
