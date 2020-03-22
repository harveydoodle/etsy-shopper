import React from 'react';
import {Text} from 'react-native';

const CustomText = ({style, children}) => (
  <Text style={{fontFamily: 'futura', ...style}}>{children}</Text>
);

export default CustomText;
