import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { favoritasProvider } from './contexts/FavoritasContext';
import { FeaturedProvider } from './contexts/FeaturedContext';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <favoritasProvider>
        <FeaturedProvider>
        <Main />
         </FeaturedProvider>
         </favoritasProvider>
         </AuthProvider>
    </ThemeProvider>
  );
}

function Main() {
  const { themeMode } = useTheme();
  return (
    <NavigationContainer theme={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </NavigationContainer>
  );
}