// @flow
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {ViewStyleProp} from 'StyleSheet';
import type {PressEvent} from 'CoreEventTypes';

const styles = StyleSheet.create({
  text: {
    color: 'royalblue',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  wrapper: {
    borderColor: 'royalblue',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

type Props = {
  children: React.Node,
  onPress: (event: PressEvent) => void,
  style?: ViewStyleProp,
};

export default class PrimaryButton extends React.Component<Props> {
  render() {
    const {children, onPress, style} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
