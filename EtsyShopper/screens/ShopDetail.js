import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, Image} from 'react-native';

import {fetchActiveListingsById} from '../apis';

import Text from '../components/Text';

const ShopDetails = ({navigation, route}) => {
  const [inventory, setInventory] = useState([]);
  const {shop_id} = route.params;
  useEffect(() => {
    fetchActiveListingsById(shop_id, ({data}) => {
      setInventory(data.results);
    });
  }, [shop_id]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={{fontSize: 22}}>Items available:</Text>
        }
        numColumns={2}
        data={inventory}
        horizontal={false}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: '#CCC',
              height: 300,
              borderRadius: 20,
              padding: 20,
              margin: 10,
            }}>
            <Image
              style={{
                width: 125,
                height: 125,
                borderRadius: 2,
                alignSelf: 'center',
              }}
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

export default ShopDetails;
