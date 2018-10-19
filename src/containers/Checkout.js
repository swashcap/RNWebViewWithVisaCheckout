// @flow
import React from 'react';
import {connect} from 'react-redux';
import {WebView} from 'react-native';
import type {CartState} from '../reducers/cart';

type Props = {
  total: number,
};

class Checkout extends React.Component<Props> {
  static navigationOptions = {
    title: 'Checkout',
  };

  static getHTML() {
    return `<h1>Checkout</h1>`;
  }

  render() {
    return (
      <WebView originWhitelist={['*']} source={{html: Checkout.getHTML()}} />
    );
  }
}

export default connect(({cart: {total}}) => ({total}))(Checkout);
