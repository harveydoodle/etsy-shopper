import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {baseFontColor} from '../styles/defaultStyles';

const CustomText = props => (
  <Text {...props} style={{...styles.text, ...props.style}}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'futura',
    fontSize: 16,
    color: baseFontColor,
  },
});
export default CustomText;
