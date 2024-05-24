import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LottieViews from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splashscreen = ({ navigation }) => {
 
  useEffect(() => {
    const checkOnBoarding = async () => {
      try {
        const userToken = await AsyncStorage.getItem('onBoardingShow');
        console.log(userToken);
        if (userToken) {
          navigation.navigate('Login'); // Navigate to Login if onboarding is completed
        } else {
          navigation.navigate('onBoarding'); // Navigate to onboarding if not completed
        }
      } catch (error) {
        console.error('Error checking onboarding:', error);
      }
    };

    // Call checkOnBoarding after 3 seconds
    const timer = setTimeout(() => {
      checkOnBoarding();
    }, 3000); // 3 seconds

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigation]); // Include navigation in the dependency array

  return (
    <View style={styles.container}>
      <LottieViews
        source={require("../assets/Love.json")}
        autoPlay
        speed={2}
        loop={false}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        resizeMode='cover' />
      <Image source={require("../assets/icons/Match.png")} style={{ height: '50%', width: '50%' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Change the background color as per your design
  },
  image: {
    width: '50%', // Adjust width and height as per your image size
    height: '50%',
    resizeMode: 'contain',
  },
});

export default Splashscreen;
