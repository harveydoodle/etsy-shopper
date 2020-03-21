import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text} from 'react-native';

import {fetchTopCategories} from '../apis';

const Categories = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  fetchTopCategories(res => console.log('eee', res));
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Select One:</Text>
    </SafeAreaView>
  );
};

export default Categories;
