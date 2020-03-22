import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {get} from 'lodash';

import {fetchAllShops} from '../apis';

import {LocationContext} from '../context/LocationContext';

import Text from '../components/Text';

const Shops = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const location = useContext(LocationContext);
  const {lat, lng, structured_formatting, description} = location.location;
  const displayAddress = get(structured_formatting, 'main_text') || description;
  useEffect(() => {
    fetchAllShops({distance: 4, lat: lat, long: lng}, ({data}) => {
      const allShops = data.results;
      setShops(allShops);
    });
  }, [lat, lng]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={shops}
        ListHeaderComponent={
          <Text style={{fontSize: 22}}>
            Stores based around {displayAddress}:
          </Text>
        }
        horizontal={false}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShopDetail', {shop_id: item.shop_id})
            }
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#EEE',
              margin: 10,
              padding: 20,
              borderRadius: 4,
            }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 20}}>
              {item.shop_name}
            </Text>
            <Text numberOfLines={3}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => `${item.shop_id}`}
      />
    </SafeAreaView>
  );
};

export default Shops;
