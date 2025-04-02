import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/components/LoginScreen';
import FanTabs from './FanTabs';
import ReviewerTabs from './ReviewerTabs';
import MovieDetailsScreen from '../screens/Reviewer/MovieDetailsScreen';
import { useAuth } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : user.role === 'fan' ? (
        <Stack.Screen name="Fan" component={FanTabs} />
      ) : (
        <>
          <Stack.Screen name="Reviewer" component={ReviewerTabs} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
