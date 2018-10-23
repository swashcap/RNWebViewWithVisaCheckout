/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';

import Cart from './containers/Cart';
import Checkout from './containers/Checkout';
import Error from './containers/Error';
import OrderConfirmation from './containers/OrderConfirmation';
import configureStore from './store/configureStore';

const StackNavigator = createStackNavigator(
  {
    Cart,
    Checkout,
    Error,
    OrderConfirmation,
  },
  {
    cardStyle: {
      backgroundColor: 'white',
    },
    initialRouteName: 'Cart',
  }
);
const store = configureStore();

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}
