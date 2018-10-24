// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  children?: React.Node,
};

export default class Center extends React.Component<Props> {
  render() {
    const {children} = this.props;

    return <View style={styles.container}>{children}</View>;
  }
}
