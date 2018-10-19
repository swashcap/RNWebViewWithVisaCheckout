/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import Cart from './components/Cart';
import Checkout from './components/Checkout';

export default createStackNavigator(
  {
    Cart,
    Checkout,
  },
  {
    cardStyle: {
      backgroundColor: 'white',
    },
    initialRouteName: 'Cart',
  }
);
