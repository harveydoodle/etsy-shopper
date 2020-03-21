import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text} from 'react-native';

import {fetchAllShops} from '../apis';

import {LocationContext} from '../context/LocationContext';

const Categories = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const location = useContext(LocationContext);
  const {lat, lng} = location.location;
  fetchAllShops({distance: 4, lat: lat, long: lng}, ({data}) => {
    const allShops = data.results;
    setShops(allShops);
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Select One:</Text>
    </SafeAreaView>
  );
};

export default Categories;
