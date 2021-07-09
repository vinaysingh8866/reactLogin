import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { LoadingScreen } from './screens/LoadingScreen'
import { LoginScreen } from './screens/LoginScreen'
import { DashboardScreen } from './screens/DashboardScreen'

import * as firebase from 'firebase'
import { firebaseConfig } from './config';



const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
})


const AppNavigator = createAppContainer(AppSwitchNavigator);
firebase.initializeApp(firebaseConfig)
export default function App() {
  return (
    <View style={styles.container}>

      <AppNavigator />

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
