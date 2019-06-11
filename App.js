import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/Home';
import CameraScreen from './src/CameraScreen';

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    CameraScreen: { screen: CameraScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#4256f4',
      },
      headerTitleStyle: {
        color: '#FFF'
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
