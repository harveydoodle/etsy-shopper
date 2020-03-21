import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const Landing = ({navigation}) => {
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

export default Landing;
