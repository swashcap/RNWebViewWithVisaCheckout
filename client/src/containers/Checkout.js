// @flow
import React from 'react';
import {connect} from 'react-redux';
import {WebView} from 'react-native';
import type {Dispatch} from 'redux';
import type {NavigationScreenProp} from 'react-navigation';

import {addMessage} from '../actions/errors';
import type {CartState} from '../reducers/cart';
import {API_BASE_URL} from '../utils/config';

type Props = {
  dispatch: Dispatch<any>,
  navigation: NavigationScreenProp<any>,
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

    return `${API_BASE_URL}/checkout?subtotal=${total}`;
  };

  /**
   * @note This catches all `window.postMessage` calls, including some made by
   * the Visa JavaScript SDK. Look for expected object shapes.
   */
  handleMessage = (event: WebViewMessageEvent) => {
    const {dispatch, navigation} = this.props;
    let message;

    try {
      message = JSON.parse(event.nativeEvent.data);
    } catch (e) {}

    if (typeof message === 'object' && message.type) {
      if (message.type === 'payment.success') {
        debugger;
        navigation.navigate('OrderConfirmation');
      } else if (message.type === 'payment.cancel') {
        dispatch(addMessage('Visa Checkout payment cancelled'));
        navigation.navigate('Error');
      } else if (message.type === 'payment.error') {
        dispatch(
          addMessage(`Visa Checkout error:

JSON.stringify(message.data)`)
        );
        navigation.navigate('Error');
      }
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
