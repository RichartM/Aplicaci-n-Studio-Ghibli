import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesReviewScreen from '../screens/Reviewer/MoviesReviewScreen';
import FeaturedScreen from '../screens/Reviewer/FeaturedScreen';

const Tab = createBottomTabNavigator();

const ReviewerTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Películas" component={MoviesReviewScreen} />
    <Tab.Screen name="Destacadas" component={FeaturedScreen} />
  </Tab.Navigator>
);

export default ReviewerTabs;