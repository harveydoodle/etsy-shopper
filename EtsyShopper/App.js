/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {StyleSheet, StatusBar, Platform, UIManager} from 'react-native';
import 'react-native-gesture-handler';

/** Navigation */
navigator.geolocation = require('@react-native-community/geolocation');
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/** Context */
import {LocationProvider} from './context/LocationContext';
import {CartProvider} from './context/CartContext';

/** Screens */
import UserLocation from './screens/UserLocation';
import Landing from './screens/Landing';
import Categories from './screens/Categories';
import Shops from './screens/Shops';
import ShopDetail from './screens/ShopDetail';
import ShoppingCart from './screens/ShoppingCart';

/** Components */
import CartIcon from './components/CartIcon';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
/** Constants */
import {baseFontColor} from './styles/defaultStyles';

const Stack = createStackNavigator();
// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const App: () => React$Node = () => {
  const [route, setRoute] = useState('Landing');
  const ref = React.useRef(null);

  const showCartIcon = route !== 'Landing' && route !== 'ShoppingCart';

  return (
    <NavigationContainer
      onStateChange={state => {
        const currentRouteName = getActiveRouteName(state);
        setRoute(currentRouteName);
      }}
      ref={ref}>
      <LocationProvider>
        <CartProvider>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: styles.navHeaderStyle,
              headerTintColor: baseFontColor,
              headerTitleStyle: styles.navHeaderTitleStyle,
              headerBackTitle: ' ',
              title: null,
              headerBackStyle: styles.navHeaderBackStyle,
            }}
            initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="UserLocation" component={UserLocation} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Shops" component={Shops} />
            <Stack.Screen name="ShopDetail" component={ShopDetail} />
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
          </Stack.Navigator>
          {showCartIcon && (
            <CartIcon
              onPress={() =>
                ref.current && ref.current.navigate('ShoppingCart')
              }
            />
          )}
        </CartProvider>
      </LocationProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navHeaderStyle: {
    shadowColor: 'transparent',
  },
  navHeaderTitleStyle: {
    fontWeight: 'bold',
  },
});

export default App;
