import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PelisScreen from '../screens/Fan/PelisScreen';
import FavoritesScreen from '../screens/Fan/FavoritesScreen';

const Tab = createBottomTabNavigator();

const FanTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Películas" component={PelisScreen} />
    <Tab.Screen name="Favoritos" component={FavoritesScreen} />
  </Tab.Navigator>
);

export default FanTabs;