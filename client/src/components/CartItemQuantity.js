// @flow
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  quantityText: {
    fontWeight: '700',
  },
  text: {
    color: 'dimgray',
  },
});

type Props = {
  quantity: number,
  onPress: (newQuantity: number) => void,
};

export default class CartItemQuantity extends React.Component<Props> {
  render() {
    const {quantity, onPress} = this.props;

    return (
      <TouchableOpacity onPress={() => onPress(quantity + 1)}>
        <View>
          <Text style={styles.text}>
            {'Quantity: '}
            <Text style={styles.quantityText}>{quantity}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
