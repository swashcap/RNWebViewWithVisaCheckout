// @flow
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import CartItemQuantity from './CartItemQuantity';
import SecondaryButton from './SecondaryButton';

const styles = StyleSheet.create({
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  image: {
    height: 80,
    width: 80,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  nameWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  price: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 3,
  },
  priceText: {
    color: 'dimgray',
    fontSize: 14,
  },
  priceTextWithSale: {
    color: 'gray',
    paddingLeft: 3,
    textDecorationLine: 'line-through',
  },
  salePriceText: {
    color: 'green',
    fontWeight: '700',
  },
});

type Props = {
  imageUri: string,
  name: string,
  onQuantityChange: (newQuantity: number) => void,
  onSaveForLaterPress: Function,
  price: string,
  quantity: number,
  salePrice?: string,
};

export default class Cart extends React.Component<Props> {
  renderPrice = () => {
    const {price, salePrice} = this.props;
    const priceComponents = salePrice ? (
      <React.Fragment>
        <Text style={styles.salePriceText}>{salePrice}</Text>
        <Text style={[styles.priceText, styles.priceTextWithSale]}>
          {price}
        </Text>
      </React.Fragment>
    ) : (
      <Text style={styles.priceText}>{price}</Text>
    );

    return <View style={styles.price}>{priceComponents}</View>;
  };

  render() {
    const {
      imageUri,
      name,
      onQuantityChange,
      onSaveForLaterPress,
      quantity,
    } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageUri}} />
        <View style={styles.content}>
          {this.renderPrice()}
          <View style={styles.nameWrapper}>
            <Text numberOfLines={2} style={styles.name}>
              {name}
            </Text>
          </View>
          <View style={styles.bottomWrapper}>
            <CartItemQuantity onPress={onQuantityChange} quantity={quantity} />
            <SecondaryButton onPress={onSaveForLaterPress}>
              Save for Later
            </SecondaryButton>
          </View>
        </View>
      </View>
    );
  }
}
