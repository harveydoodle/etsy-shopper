import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import {fetchAddressSuggestions} from '../apis';

const UserLocation = () => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (address) {
      console.log('search:', address);
      fetchAddressSuggestions(address, res => {
        console.log('data:::', res);
      });
    }
  }, [address]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text onPress={() => setAddress('1 Yonge Street')}>Hola</Text>
    </SafeAreaView>
  );
};

export default UserLocation;
