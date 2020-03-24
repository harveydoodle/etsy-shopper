import React from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';

import {baseFontColor} from '../styles/defaultStyles';

const EmptyListText = () => <Text style={styles.text}>No results found</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 40,
  },
});
export default EmptyListText;
