// @flow
import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import type {NavigationScreenProp} from 'react-navigation';

import Center from '../components/Center';
import PrimaryButton from '../components/PrimaryButton';
import type {CartItem as CartItemType, CartState} from '../reducers/cart';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 30,
  },
  image: {
    height: 80,
    margin: 10,
    width: 80,
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

type Props = {
  cart: CartState,
  navigation: NavigationScreenProp<any>,
};

class OrderConfirmation extends React.Component<Props> {
  static navigationOptions = {
    title: 'Order Confirmation',
  };

  handlePress = () => {
    this.props.navigation.navigate('Cart');
  };

  render() {
    const {cart} = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Thank you for your order</Text>
        <Text style={styles.text}>
          Your order will be shipped shortly: we will send you an email
          notification with more information.
        </Text>
        <View style={styles.imageWrapper}>
          {Object.keys(cart.items).map(key => {
            const item = cart.items[key];

            return (
              <View key={key}>
                <Image source={{uri: item.imageUri}} style={styles.image} />
              </View>
            );
          })}
        </View>
        <Center>
          <PrimaryButton onPress={this.handlePress}>
            Return to Cart
          </PrimaryButton>
        </Center>
      </ScrollView>
    );
  }
}

export default connect(({cart}) => ({cart}))(OrderConfirmation);
