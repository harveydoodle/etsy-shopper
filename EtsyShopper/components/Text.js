import React from 'react';
import {Text} from 'react-native';

const CustomText = ({style, children}) => (
  <Text style={{fontFamily: 'futura', color: '#464646', ...style}}>
    {children}
  </Text>
);

export default CustomText;
