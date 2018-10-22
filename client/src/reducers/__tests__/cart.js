// @flow
import {remove, setQuantity, saveForLater} from '../../actions/cart';
import reducer from '../cart';

const cartStateStub = () => ({
  items: {
    '0': {
      id: '000',
      imageUri: '',
      name: 'Sample 0',
      price: 1,
      quantity: 1,
    },
    '1': {
      id: '111',
      imageUri: '',
      name: 'Sample 1',
      price: 2,
      quantity: 2,
    },
  },
  saveForLater: {},
  total: 5,
});

test('remove an item', () => {
  const cartState = cartStateStub();

  expect(reducer(cartState, remove('1'))).toEqual({
    items: {
      '0': cartState.items['0'],
    },
    saveForLater: {},
    total: 1,
  });
});

test('saves item for later', () => {
  const cartState = cartStateStub();

  expect(reducer(cartState, saveForLater('0'))).toEqual({
    items: {
      '1': cartState.items['1'],
    },
    saveForLater: {
      '0': cartState.items['0'],
    },
    total: 4,
  });
});

test('changes item quantity', () => {
  const cartState = cartStateStub();

  expect(reducer(cartState, setQuantity('1', 3))).toEqual({
    items: {
      '0': cartState.items['0'],
      '1': Object.assign({}, cartState.items['1'], {quantity: 3}),
    },
    saveForLater: {},
    total: 7,
  });
});
