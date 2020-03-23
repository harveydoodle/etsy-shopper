import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = props => (
  <TouchableOpacity
    style={{
      ...styles.buttonWrapper,
      ...{
        backgroundColor: props.backgroundColor,
      },
    }}
    onPress={props.onPress}>
    <Text style={{...styles.buttonText, ...props.textStyles}}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: 'futura',
    fontSize: 18,
    color: '#fff',
  },
});

export default CustomButton;
