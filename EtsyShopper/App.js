/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
navigator.geolocation = require('@react-native-community/geolocation');
/** Navigation */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {LocationProvider} from './context/LocationContext';

import UserLocation from './screens/UserLocation';
import Landing from './screens/Landing';
import Categories from './screens/Categories';
import Shops from './screens/Shops';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <LocationProvider>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={({route}) => ({
              headerStyle: styles.navHeaderStyle,
              headerTintColor: '#464646',
              headerTitleStyle: styles.navHeaderTitleStyle,
            })}
          />
          <Stack.Screen
            name="UserLocation"
            options={({route}) => ({
              title: 'Your Location',
              headerStyle: styles.navHeaderStyle,
              headerTintColor: '#464646',
              headerTitleStyle: styles.navHeaderTitleStyle,
            })}
            component={UserLocation}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={({route}) => ({
              headerStyle: styles.navHeaderStyle,
              headerTintColor: '#464646',
              headerTitleStyle: styles.navHeaderTitleStyle,
            })}
          />
          <Stack.Screen
            name="Shops"
            component={Shops}
            options={({route}) => ({
              headerStyle: styles.navHeaderStyle,
              headerTintColor: '#464646',
              headerTitleStyle: styles.navHeaderTitleStyle,
            })}
          />
        </Stack.Navigator>
      </LocationProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navHeaderStyle: {},
  navHeaderTitleStyle: {
    fontWeight: 'bold',
  },
});

export default App;
