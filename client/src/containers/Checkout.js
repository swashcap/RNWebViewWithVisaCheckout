// @flow
import React from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, StyleSheet, WebView} from 'react-native';
import type {CartState} from '../reducers/cart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  total: number,
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

    return `http://dev.walmart.com:4000?total=${total}`;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{uri: this.getSourceURI()}}
        />
      </SafeAreaView>
    );
  }
}

export default connect(({cart: {total}}) => ({total}))(Checkout);
