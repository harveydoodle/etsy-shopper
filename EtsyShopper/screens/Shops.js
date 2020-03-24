import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {get} from 'lodash';

import {fetchAllShops} from '../apis';

import {LocationContext} from '../context/LocationContext';

import Text from '../components/Text';
import EmptyListText from '../components/EmptyListText';

import {
  headerStyles,
  safeViewWrapper,
  baseSpacing,
} from '../styles/defaultStyles';

const Shops = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const location = useContext(LocationContext);
  const {
    lat,
    lng,
    structured_formatting,
    description,
    is_custom,
  } = location.location;

  const displayAddress = is_custom
    ? description
    : get(structured_formatting, 'main_text') || description;
  useEffect(() => {
    fetchAllShops({distance: 4, lat: lat, long: lng}, ({data}) => {
      const allShops = data.results;
      setShops(allShops);
    });
  }, [lat, lng]);
  return (
    <SafeAreaView style={safeViewWrapper}>
      <FlatList
        ListEmptyComponent={<EmptyListText />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={[]}
        ListHeaderComponent={
          !!displayAddress && (
            <Text style={headerStyles}>
              Stores based around {displayAddress}:
            </Text>
          )
        }
        horizontal={false}
        contentContainerStyle={{
          padding: baseSpacing,
        }}
        renderItem={({item}, key) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShopDetail', {shop_id: item.shop_id})
            }
            style={styles.itemWrapper}>
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

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffe39a',
    margin: 10,
    padding: baseSpacing,
    borderRadius: 8,
  },
});

export default Shops;
