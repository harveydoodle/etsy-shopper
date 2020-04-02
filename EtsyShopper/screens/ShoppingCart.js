import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList} from 'react-native';

import {CartContext} from '../context/CartContext';

const ShoppingCart = ({navigation}) => {
  const cart = useContext(CartContext);
  const data = cart.cart;
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList data={data} renderItem={item => console.log(item)} />
    </SafeAreaView>
  );
};

export default ShoppingCart;
