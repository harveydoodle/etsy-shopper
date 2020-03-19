import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';

export default Landing = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        onPress={() => {
          navigation.navigate('UserLocation');
        }}>
        Landing!
      </Text>
    </SafeAreaView>
  );
};
