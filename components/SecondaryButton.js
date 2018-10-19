// @flow
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {ViewStyleProp} from 'StyleSheet';
import type {PressEvent} from 'CoreEventTypes';

const styles = StyleSheet.create({
  text: {
    color: 'royalblue',
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  wrapper: {
    borderColor: 'royalblue',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

type Props = {
  children?: string,
  onPress: (event: PressEvent) => void,
  style?: ViewStyleProp,
};

export default class SecondaryButton extends React.Component<Props> {
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
