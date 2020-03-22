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

/** Navigation */
navigator.geolocation = require('@react-native-community/geolocation');
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/** Context */
import {LocationProvider} from './context/LocationContext';

/** Screens */
import UserLocation from './screens/UserLocation';
import Landing from './screens/Landing';
import Categories from './screens/Categories';
import Shops from './screens/Shops';

/** Constants */
import {baseFontColor} from './styles/defaultStyles';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <LocationProvider>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: styles.navHeaderStyle,
            headerTintColor: baseFontColor,
            headerTitleStyle: styles.navHeaderTitleStyle,
          }}
          initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen
            name="UserLocation"
            options={({route}) => ({
              title: 'Your Location',
            })}
            component={UserLocation}
          />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Shops" component={Shops} />
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
