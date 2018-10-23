// @flow
import {combineReducers} from 'redux';

import cart from './cart';
import errors from './errors';

const rootReducer = combineReducers({
  cart,
  errors,
});

export default rootReducer;
