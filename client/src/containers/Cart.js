// @flow
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import type {NavigationScreenProp} from 'react-navigation';

import CartFooter from '../components/CartFooter';
import CartItem from '../components/CartItem';
import {formatPrice} from '../utils';
import type {CartItem as CartItemType, CartState} from '../reducers/cart';
import {remove, saveForLater, setQuantity} from '../actions/cart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewSpacer: {
    paddingVertical: 5,
  },
});

type Props = {
  cart: CartState,
  dispatch: Dispatch<any>,
  navigation: NavigationScreenProp<any>,
};

class Cart extends React.Component<Props> {
  static navigationOptions = {
    title: 'Cart',
  };

  handleQuantityChange = (key: string, quantity: number) => {
    this.props.dispatch(setQuantity(key, quantity));
  };

  handleRemovePress = (key: string) => {
    this.props.dispatch(remove(key));
  };

  handleSaveForLaterPress = (key: string) => {
    this.props.dispatch(saveForLater(key));
  };

  render() {
    const {cart, navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollViewSpacer} />
          {Object.keys(cart.items).map(key => {
            const item = cart.items[key];

            return (
              <CartItem
                imageUri={item.imageUri}
                key={key}
                name={item.name}
                onQuantityChange={quantity =>
                  this.handleQuantityChange(key, quantity)
                }
                onRemovePress={() => this.handleRemovePress(key)}
                onSaveForLaterPress={() => this.handleSaveForLaterPress(key)}
                price={formatPrice(item.price)}
                quantity={item.quantity}
                salePrice={
                  item.salePrice ? formatPrice(item.salePrice) : undefined
                }
              />
            );
          })}
          <View style={styles.scrollViewSpacer} />
        </ScrollView>
        <CartFooter onPress={() => navigation.navigate('Checkout')}>
          {formatPrice(cart.total)}
        </CartFooter>
      </View>
    );
  }
}

export default connect(({cart}) => ({cart}))(Cart);
