import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {get} from 'lodash';
import {Icon} from 'react-native-elements';

const CartIcon = ({onPress}) => {
  return (
    <SafeAreaView
      style={{zIndex: 1000, position: 'absolute', bottom: 0, right: 0}}>
      <Text onPress={onPress}>hola~~</Text>
    </SafeAreaView>
  );
};

export default CartIcon;
