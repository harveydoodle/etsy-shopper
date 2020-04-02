import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {CartContext} from '../context/CartContext';

import Text from '../components/Text';

import {
  safeViewWrapper,
  headerStyles,
  baseLightestGrey,
  baseSpacing,
  baseRadius,
} from '../styles/defaultStyles';

const styles = StyleSheet.create({
  quantityWrapper: {
    flex: 0,
    minWidth: 25,
    minHeight: 25,
    marginLeft: baseSpacing / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityIconWrapper: {
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: baseLightestGrey,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  quantityIcon: {
    fontSize: 13,
    color: '#fff',
  },
  quantityText: {
    fontSize: 17,
    marginHorizontal: baseSpacing / 3,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: baseSpacing,
    borderRadius: baseRadius,
  },
  rowWrapper: {flexDirection: 'row', marginBottom: baseSpacing},
});

const Header = () => {
  return (
    <View>
      <Text style={headerStyles}>Shopping cart</Text>
    </View>
  );
};

const ListItem = ({item}) => {
  const cart = useContext(CartContext);
  return (
    <View style={styles.rowWrapper}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={{flex: 1}}>
        <Text numberOfLines={3}>{item.title}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 13}}>${item.price}</Text>
      </View>
      <View style={styles.quantityWrapper}>
        <TouchableOpacity
          style={styles.quantityIconWrapper}
          onPress={() => cart.subtract(item.listing_id)}>
          <Text
            style={{
              ...styles.quantityIcon,
              ...{
                bottom: 1.5,
              },
            }}>
            —
          </Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityIconWrapper}
          onPress={() => cart.add(item.listing_id)}>
          <Text style={styles.quantityIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ShoppingCart = ({navigation}) => {
  const cart = useContext(CartContext);
  const data = cart.cart;
  return (
    <SafeAreaView style={safeViewWrapper}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.listing_id}`}
        style={{padding: baseSpacing}}
        data={data}
        renderItem={item => <ListItem {...item} />}
        ListHeaderComponent={<Header />}
      />
    </SafeAreaView>
  );
};

export default ShoppingCart;
