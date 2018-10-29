// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import type {ViewProps} from 'ViewPropTypes';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Center extends React.Component<ViewProps> {
  render() {
    const {children, style, ...rest} = this.props;
    const rootStyle = style ? [styles.container, style] : styles.container;

    return (
      <View style={rootStyle} {...rest}>
        {children}
      </View>
    );
  }
}
