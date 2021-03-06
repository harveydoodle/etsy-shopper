import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Animated,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {get, delay} from 'lodash';
import {Icon} from 'react-native-elements';

import {fetchActiveListingsById} from '../apis';

import {CartContext} from '../context/CartContext';

import Text from '../components/Text';
import EmptyListText from '../components/EmptyListText';
import ErrorText from '../components/ErrorText';

import {
  headerStyles,
  baseOrange,
  baseLightGrey,
  safeViewWrapper,
  baseDarkBlue,
  baseSpacing,
} from '../styles/defaultStyles';

const filters = [
  {key: 'price_ascending', title: 'Low to High'},
  {key: 'price_descending', title: 'High to Low'},
  {key: 'newest', title: 'Newest'},
];

const ListItem = ({item}) => {
  const cart = useContext(CartContext);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [checkmark, setCheckmark] = useState(false);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
    }).start();
  });

  const cartData = {
    listing_id: item.listing_id,
    sku: item.sku,
    quantity: 1,
    image: item.MainImage.url_170x135,
    title: item.title,
    price: item.price,
  };
  const makeDisable = () => {
    setCheckmark(true);
    delay(() => setCheckmark(false), 1000);
  };
  const handleAddToCard = () => {
    makeDisable();
    let newCart = [cartData];
    cart.update(newCart);
  };

  return (
    <Animated.View
      style={{...styles.itemContainerWrapper, ...{opacity: fadeAnim}}}>
      <TouchableOpacity
        disabled={checkmark}
        onPress={handleAddToCard}
        style={styles.itemsWrapper}>
        <Image
          style={styles.image}
          source={{uri: item.MainImage.url_170x135}}
        />
        {checkmark && (
          <View style={styles.checkmark}>
            <Icon name="check" size={52} color={baseDarkBlue} />
          </View>
        )}
        <Text numberOfLines={3} style={{fontSize: 20, fontWeight: 'bold'}}>
          ${item.price}
        </Text>
        <Text numberOfLines={3}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

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
  const [sort, setSort] = useState('newest');
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
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
        renderItem={item => <ListItem {...item} />}
        keyExtractor={item => `${item.listing_id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: baseLightGrey,
    height: 300,
    borderRadius: 20,
    padding: baseSpacing,
    margin: 10,
  },
  itemsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    alignSelf: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 0,
    left: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 125,
    height: 125,
    borderRadius: 62.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ShopDetails;
