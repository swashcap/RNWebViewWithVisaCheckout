// @flow
import {combineReducers} from 'redux';

import cart from './cart';
import checkout from './checkout';
import errors from './errors';

const rootReducer = combineReducers({
  cart,
  checkout,
  errors,
});

export default rootReducer;
