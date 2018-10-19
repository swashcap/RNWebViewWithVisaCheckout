// @flow
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import type {NavigateScreenProps} from 'react-navigation';

import CartFooter from './CartFooter';
import CartItem from './CartItem';
import {formatPrice} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: 10,
  },
});

type Props = {
  navigation: NavigateScreenProps<any>,
};

type State = {
  items: Array<{
    id: string,
    image: string,
    name: string,
    price: number,
    quantity: number,
    salePrice?: number,
  }>,
};

export default class Cart extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Cart',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      items: [
        {
          id: '1',
          image:
            'https://i5.walmartimages.com/asr/119b3443-4fc7-4c3c-8d08-86a3c6f84602_2.01584c522cf3abf387be1b6a0e51ffa0.jpeg?odnWidth=160&odnHeight=160&odnBg=ffffff',
          name: 'Samsung Galaxy S9',
          price: 829.99,
          quantity: 1,
        },
        {
          id: '2',
          image:
            'https://i5.walmartimages.com/asr/edb4210b-3cce-445b-8a00-1d111c2ebbfe_1.c7f2f005f63c366d160ff64b94db7f7d.jpeg?odnWidth=160&odnHeight=160&odnBg=ffffff',
          name: 'CoverON Samsung Galaxy S9 Case',
          price: 9.99,
          quantity: 1,
        },
        {
          id: '3',
          image:
            'https://i5.walmartimages.com/asr/ed2e3e87-229c-4f23-b8d8-3fdf55d447d9_1.a968fc3df71068fb47fd73438fab0093.jpeg?odnWidth=200&odnHeight=200&odnBg=ffffff',
          name: 'Rayovac Rechargeable AAA Batteries',
          price: 9.99,
          quantity: 2,
          salePrice: 7.8,
        },
        {
          id: '4',
          image:
            'https://i5.walmartimages.com/asr/36e7b6e7-737f-4675-8b47-561c2e410f4b_1.9e771d4592af8f60f44bb1a34bc0659c.jpeg?odnWidth=160&odnHeight=160&odnBg=ffffff',
          name: 'GimMe Organic Roasted Seaweed Snacks',
          price: 5.95,
          quantity: 4,
        },
      ],
    };
  }

  getPriceTotal = (): number => {
    return this.state.items.reduce(
      (total, {quantity, price, salePrice}) =>
        total + (salePrice || price) * quantity,
      0
    );
  };

  handleQuantityChange = (newQuantity: number, index: number) => {
    this.setState({
      items: this.state.items.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
      ),
    });
  };

  handleSaveForLaterPress = () => {
    console.warn('Implement me!');
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.state.items.map((item, index) => (
            <CartItem
              imageUri={item.image}
              key={item.id}
              name={item.name}
              onQuantityChange={newQuantity =>
                this.handleQuantityChange(newQuantity, index)
              }
              onSaveForLaterPress={this.handleSaveForLaterPress}
              price={formatPrice(item.price)}
              quantity={item.quantity}
              salePrice={
                item.salePrice ? formatPrice(item.salePrice) : undefined
              }
            />
          ))}
        </ScrollView>
        <CartFooter onPress={() => navigation.navigate('Checkout')}>
          {formatPrice(this.getPriceTotal())}
        </CartFooter>
      </View>
    );
  }
}
