import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Animated,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {get} from 'lodash';
import {Icon} from 'react-native-elements';

import {fetchActiveListingsById} from '../apis';

import Text from '../components/Text';
import EmptyListText from '../components/EmptyListText';
import ErrorText from '../components/ErrorText';

import {
  headerStyles,
  baseOrange,
  baseLightGrey,
  safeViewWrapper,
  baseSpacing,
} from '../styles/defaultStyles';

const filters = [
  {key: 'price_ascending', title: 'Low to High'},
  {key: 'price_descending', title: 'High to Low'},
  {key: 'newest', title: 'Newest'},
];

const FilterOption = ({text, selected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: 16,
          paddingVertical: baseSpacing / 4,
          paddingHorizontal: baseSpacing / 2,
          marginLeft: baseSpacing / 1.5,
          backgroundColor: baseLightGrey,
        },
        selected && {
          backgroundColor: baseOrange,
        },
      ]}>
      <Text style={{color: '#fff'}}>{text}</Text>
    </TouchableOpacity>
  );
};

const ListHeader = ({setSort, toggleSort, sortActive, sort}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={headerStyles}>Items available:</Text>
        <TouchableOpacity
          onPress={toggleSort}
          style={{
            flexDirection: 'row',
          }}>
          <Text>Sort </Text>
          <Icon name="sort" />
        </TouchableOpacity>
      </View>
      {sortActive && (
        <Animated.View
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {filters.map(filter => (
            <FilterOption
              onPress={() => setSort(filter.key)}
              key={filter.key}
              text={filter.title}
              selected={filter.key === sort}
            />
          ))}
        </Animated.View>
      )}
    </>
  );
};

const ShopDetails = ({navigation, route}) => {
  const [sort, setSort] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState('');
  const [sortActive, setSortActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const {shop_id} = route.params;
  useEffect(() => {
    fetchActiveListingsById(shop_id, sort, ({data, response}) => {
      if (get(response, 'status') >= 400) {
        setLoading(false);
        setError('Something went wrong, please try again!');
        setInventory([]);
        return;
      }
      setError('');
      setLoading(false);
      setInventory(data.results);
    });
  }, [shop_id, sort]);
  if (loading) {
    return (
      <SafeAreaView style={{...safeViewWrapper, ...{justifyContent: 'center'}}}>
        <ActivityIndicator size="large" style={{alignSelf: 'center'}} />
      </SafeAreaView>
    );
  }
  const toggleSort = () => {
    setSortActive(!sortActive);
  };

  return (
    <SafeAreaView style={safeViewWrapper}>
      <FlatList
        ListEmptyComponent={
          !error ? <EmptyListText /> : <ErrorText error={error} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ListHeader
            setSort={item => setSort(item)}
            toggleSort={toggleSort}
            sortActive={sortActive}
            sort={sort}
          />
        }
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
    borderColor: baseLightGrey,
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
