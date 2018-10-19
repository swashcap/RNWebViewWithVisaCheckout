// @flow
import React from 'react';
import {WebView} from 'react-native';

type Props = {};

export default class Checkout extends React.Component<Props> {
  static navigationOptions = {
    title: 'Checkout',
  };

  static getHTML() {
    return `<h1>Checkout</h1>`
  }

  render() {
    return (
      <WebView
      originWhitelist={['*']}
      source={{ html: Checkout.getHTML() }}
      />
    );
  }
}
