// @flow
import React from 'react';
import {connect} from 'react-redux';
import {WebView} from 'react-native';
import type {CartState} from '../reducers/cart';

type Props = {
  total: number,
};

type WebViewMessageEvent = {
  nativeEvent: {
    data: string,
  },
};

class Checkout extends React.Component<Props> {
  static navigationOptions = {
    title: 'Checkout',
  };

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.total !== this.props.total;
  }

  /**
   * @note This adds the `total` to the query parameter. In a secure example a
   * transaction token would be sent and the server would configure the
   * resulting WebView content with the secure checkout information.
   */
  getSourceURI = () => {
    const {total} = this.props;

    return `http://dev.walmart.com:4000/checkout?subtotal=${total}`;
  };

  /**
   * @note This catches all `window.postMessage` calls, including some made by
   * the Visa JavaScript SDK. Look for expected object shapes.
   */
  handleMessage = (event: WebViewMessageEvent) => {
    let message;

    try {
      message = JSON.parse(event.nativeEvent.data);
    } catch (e) {}

    if (
      typeof message === 'object' &&
      message.type &&
      (message.type === 'payment.success' ||
        message.type === 'payment.cancel' ||
        message.type === 'payment.error')
    ) {
      debugger;
    }
  };

  render() {
    return (
      <WebView
        onMessage={this.handleMessage}
        originWhitelist={['*']}
        source={{uri: this.getSourceURI()}}
        useWebKit
      />
    );
  }
}

export default connect(({cart: {total}}) => ({total}))(Checkout);
