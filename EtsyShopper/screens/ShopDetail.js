import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, Image, StyleSheet} from 'react-native';

import {fetchActiveListingsById} from '../apis';

import Text from '../components/Text';

import {
  headerStyles,
  safeViewWrapper,
  baseSpacing,
} from '../styles/defaultStyles';

const ShopDetails = ({navigation, route}) => {
  const [inventory, setInventory] = useState([]);
  const {shop_id} = route.params;
  useEffect(() => {
    fetchActiveListingsById(shop_id, ({data}) => {
      setInventory(data.results);
    });
  }, [shop_id]);
  return (
    <SafeAreaView style={safeViewWrapper}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={headerStyles}>Items available:</Text>}
        numColumns={2}
        data={inventory}
        horizontal={false}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({item}) => (
          <View style={styles.itemWrapper}>
            <Image
              style={styles.image}
              source={{uri: item.MainImage.url_170x135}}
            />
            <Text numberOfLines={3} style={{fontSize: 20, fontWeight: 'bold'}}>
              ${item.price}
            </Text>
            <Text numberOfLines={3}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => `${item.listing_id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#CCC',
    height: 300,
    borderRadius: 20,
    padding: baseSpacing,
    margin: 10,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    alignSelf: 'center',
  },
});

export default ShopDetails;
