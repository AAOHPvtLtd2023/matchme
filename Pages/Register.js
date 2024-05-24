// RegisterScreen.js
import React, { useState } from 'react';
import InputProfileScreen from '../components/InputProfileScreen';
import { Alert, BackHandler, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function RegisterScreen({ navigation }) {

  const handleBackpress = () => {
    Alert.alert('Exit',
      'Do you want to exit?', [{
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',

      },
      {
        text: 'exit',
        onPress: () => BackHandler.exitApp(),
      }]);
    return true;
  }
  useFocusEffect(
    React.useCallback(() => {

      BackHandler.addEventListener('hardwareBackPress', handleBackpress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackpress);
      };
    })
  )
  return (
    <>
      <StatusBar
        barStyle="dark-content" // Change this to "light-content" if you prefer light text on dark background
        backgroundColor="#dfc8e4" // Change this to your desired color
        translucent={false} // Set to true to make the status bar transparent
      />
      <InputProfileScreen />
    </>

  );
}




